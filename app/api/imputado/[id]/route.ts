// app/api/imputado/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    const imputado = await prisma.imputado.findUnique({
      where: { id },
      include: {
        nacionalidad: true,
        causas: {
          include: {
            causa: true
          }
        }
      }
    });

    if (!imputado) {
      return NextResponse.json(
        { message: 'Imputado no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(imputado);
  } catch (error) {
    console.error('Error fetching imputado:', error);
    return NextResponse.json(
      { message: 'Error al obtener el imputado', error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    const body = await req.json();
    const { nombreSujeto, docId, nacionalidadId, causaIds } = body;

    console.log('Received data:', body);
    console.log('Updating imputado with ID:', id);

    // Validar existencia del imputado
    const existingImputado = await prisma.imputado.findUnique({
      where: { id }
    });

    if (!existingImputado) {
      return NextResponse.json(
        { message: 'Imputado no encontrado' },
        { status: 404 }
      );
    }

    // Si se proporcionan nuevas causas, eliminar las relaciones existentes
    if (causaIds) {
      await prisma.causasImputados.deleteMany({
        where: { imputadoId: id }
      });
    }

    // Actualizar el imputado
    const updatedImputado = await prisma.imputado.update({
      where: { id },
      data: {
        nombreSujeto,
        docId,
        nacionalidadId: nacionalidadId ? Number(nacionalidadId) : null,
        // Crear nuevas relaciones con causas si se proporcionan
        causas: causaIds
          ? {
              create: causaIds.map((causaId: number) => ({
                causa: {
                  connect: { id: causaId }
                }
              }))
            }
          : undefined
      },
      include: {
        nacionalidad: true,
        causas: {
          include: {
            causa: true
          }
        }
      }
    });

    return NextResponse.json(updatedImputado);
  } catch (error) {
    console.error('Error updating imputado:', error);
    return NextResponse.json(
      { message: 'Error al actualizar el imputado', error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    // Validar existencia del imputado
    const existingImputado = await prisma.imputado.findUnique({
      where: { id }
    });

    if (!existingImputado) {
      return NextResponse.json(
        { message: 'Imputado no encontrado' },
        { status: 404 }
      );
    }

    // Primero eliminar las relaciones en CausasImputados
    await prisma.causasImputados.deleteMany({
      where: { imputadoId: id }
    });

    // Luego eliminar el imputado
    await prisma.imputado.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting imputado:', error);
    return NextResponse.json(
      { message: 'Error al eliminar el imputado', error },
      { status: 500 }
    );
  }
}