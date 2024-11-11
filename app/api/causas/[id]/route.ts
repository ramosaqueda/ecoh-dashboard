import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const causa = await prisma.causa.findUnique({
      where: { id: parseInt(id) },
      select: {
        // Seleccionar todos los campos básicos
        id: true,
        denominacionCausa: true,
        ruc: true,
        rit: true,
        foliobw: true,
        fechaHoraTomaConocimiento: true,
        fechaDelHecho: true,
        causaEcoh: true,
        causaLegada: true,
        constituyeSs: true,
        coordenadasSs: true,
        fechaIta: true,
        numeroIta: true,
        fechaPpp: true,
        numeroPpp: true,
        observacion: true,
        // Solo seleccionar los IDs de las relaciones
        delitoId: true,
        fiscalId: true,
        abogadoId: true,
        analistaId: true,
        tribunalId: true,
        focoId: true
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
        analistaId: data.analistaId
      },
      include: {
        delito: true,
        fiscal: true,
        abogado: true,
        analista: true,
        tribunal: true,
        foco: true
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
