import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Invalid id parameter' },
        { status: 400}
      );
    }
    const causa = await prisma.causa.findUnique({
      where: { id: parseInt(id) },
      include: {
        analista: true,
        atvt: true,
        tribunal: true,
        delito: {
          select: {
            nombre: true
          }
        },
        foco: true,
        fiscal: {
          select: {
            nombre: true
          }
        },
        causasCrimenOrg: {
          select: {
            causaId: true,
            parametroId: true,
            estado: true,
            parametro: {
              select: {
                label: true
              }
            }
          }
        }
      }
      
    });
    console.log('Causa:', causa);
    return NextResponse.json(causa);
  } catch (error) {
    console.error('Error fetching causa:', error);
    return NextResponse.json(
      { error: 'Error fetching causa' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const id = params.id;

    console.log('Received data:', data);
    console.log('Updating causa with ID:', id);

    const updatedCausa = await prisma.causa.update({
      where: { id: parseInt(id) },
      data: {
        causaEcoh: data.causaEcoh,
        causaLegada: data.causaLegada,
        constituyeSs: data.constituyeSs,
        homicidioConsumado: data.homicidioConsumado ?? false, // Agregamos el nuevo campo
        denominacionCausa: data.denominacionCausa,
        ruc: data.ruc,
        foliobw: data.foliobw,
        coordenadasSs: data.coordenadasSs,
        rit: data.rit,
        numeroIta: data.numeroIta,
        numeroPpp: data.numeroPpp,
        observacion: data.observacion,
        fechaHoraTomaConocimiento: data.fechaHoraTomaConocimiento,
        fechaDelHecho: data.fechaDelHecho,
        fechaIta: data.fechaIta,
        fechaPpp: data.fechaPpp,
        delitoId: data.delitoId,
        focoId: data.focoId,
        tribunalId: data.tribunalId,
        fiscalId: data.fiscalId,
        abogadoId: data.abogadoId,
        analistaId: data.analistaId,
        atvtId: data.atvtId,
        esCrimenOrganizado: data.esCrimenOrganizado,
      },
      include: {
        delito: true,
        abogado: true,
        analista: true,
        atvt: true,
        tribunal: true,
        foco: true,
        causasCrimenOrg: true,
        fiscal: {
          select: {
            nombre: true
          }
        },
        _count: {
          select: {
            imputados: true
          }
        }
      }
    });

    return NextResponse.json(updatedCausa);
  } catch (error) {
    console.error('Error updating causa:', error);
    return NextResponse.json(
      { error: 'Error updating causa' },
      { status: 500 }
    );
  }
}

// El endpoint DELETE no necesita cambios ya que elimina toda la causa
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.causa.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error('Error deleting causa:', error);
    return NextResponse.json(
      { error: 'Error deleting causa' },
      { status: 500 }
    );
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      console.log('Datos recibidos:', req.body); // Log de los datos recibidos
      const updatedCausa = await prisma.causa.update({
        where: { id: parseInt(id as string) },
        data: req.body,
      });
      console.log('Causa actualizada:', updatedCausa); // Log de la causa actualizada
      return res.status(200).json(updatedCausa);
    } catch (error) {
      console.error('Error al actualizar la causa:', error); // Log del error
      return res.status(500).json({ error: 'Error al actualizar la causa' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}

