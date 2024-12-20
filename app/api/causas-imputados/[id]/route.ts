import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Props {
  params: { id: string };
}

export async function GET(req: Request, { params }: Props) {
  try {
    const imputadoId = parseInt(params.id);

    if (isNaN(imputadoId)) {
      return NextResponse.json(
        { error: 'ID de imputado inválido' },
        { status: 400 }
      );
    }

    // Primero verificamos que el imputado existe
    const imputado = await prisma.imputado.findUnique({
      where: { id: imputadoId },
      include: {
        causas: {
          include: {
            causa: {
              select: {
                id: true,
                ruc: true,
                denominacionCausa: true,
                rit: true,
                tribunal: {
                  select: {
                    id: true,
                    nombre: true
                  }
                },
                delito: {
                  select: {
                    id: true,
                    nombre: true
                  }
                }
              }
            },
            cautelar: {
              select: {
                id: true,
                nombre: true
              }
            }
          }
        }
      }
    });

    if (!imputado) {
      return NextResponse.json(
        { error: 'Imputado no encontrado' },
        { status: 404 }
      );
    }

    // Formatear la respuesta para incluir solo las causas
    const causasFormateadas = imputado.causas.map((ci) => ({
      id: `${ci.causaId}-${ci.imputadoId}`,
      causaId: ci.causaId,
      imputadoId: ci.imputadoId,
      esImputado: ci.esimputado,
      essujetoInteres: ci.essujetoInteres,
      formalizado: ci.formalizado,
      fechaFormalizacion: ci.fechaFormalizacion,
      cautelarId: ci.cautelarId,
      causa: {
        ruc: ci.causa.ruc,
        denominacionCausa: ci.causa.denominacionCausa,
        rit: ci.causa.rit,
        tribunal: ci.causa.tribunal,
        delito: ci.causa.delito
      },
      cautelar: ci.cautelar
    }));

    return NextResponse.json(causasFormateadas);
  } catch (error) {
    console.error('Error fetching imputado causas:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Endpoint para actualizar una causa específica del imputado
export async function PATCH(req: Request, { params }: Props) {
  try {
    const imputadoId = parseInt(params.id);
    const data = await req.json();
    const { causaId, ...updateData } = data;

    if (!causaId) {
      return NextResponse.json(
        { error: 'Se requiere el ID de la causa' },
        { status: 400 }
      );
    }

    const updated = await prisma.causasImputados.update({
      where: {
        causaId_imputadoId: {
          causaId: parseInt(causaId),
          imputadoId: imputadoId
        }
      },
      data: updateData,
      include: {
        causa: {
          select: {
            ruc: true,
            denominacionCausa: true,
            tribunal: true,
            delito: true
          }
        },
        cautelar: true
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating causa:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: {params: {id: string}}) {
  try {
    const causaId = params.id;

    if (isNaN(parseInt(causaId))) {
      return NextResponse.json(
        { error: 'El ID de la causa no es válido' },
        { status: 400 }
      );
    }

    const {imputadoId, plazo, ...updateData } = await req.json();

    if (!imputadoId || !plazo) {
      return NextResponse.json(
        { error: 'Se requiere el ID del imputado y el plazo' },
        { status: 400 }
      );
    }

    if (isNaN(parseInt(imputadoId))) {
      return NextResponse.json(
        { error: 'El ID del imputado no es válido' },
        { status: 400 }
      );
    }

    console.log('Updating plazo del imputado:', imputadoId);
    const updatedPlazo = await prisma.causasImputados.update ({
      where: {
        causaId_imputadoId: {
          causaId: parseInt(causaId),
          imputadoId: parseInt(imputadoId)
        }
      },
      data: {plazo: plazo, ...updateData},
      include: {
        causa: {
            select: {
              imputados: {
                select: {
                  plazo: true,
                }
              }
            }
        }
      }
    });

    return NextResponse.json(updatedPlazo);

  } catch (error) {
    console.error('Error updating plazo:', error);
    return NextResponse.json(
      { error: 'Error updating plazo' },
      { status: 500 }
    );
  }
}
