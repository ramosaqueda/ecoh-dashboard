// app/api/crimenorganizadoparams/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const parametro = await prisma.parametroCrimenOrganizado.findUnique({
      where: { id }
    });

    if (!parametro) {
      return NextResponse.json(
        { error: 'Parámetro no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(parametro);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener parámetro de crimen organizado' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const data = await request.json();
    
    const parametro = await prisma.parametroCrimenOrganizado.update({
      where: { id },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        peso: data.peso,
        activo: data.activo
      }
    });

    return NextResponse.json(parametro);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al actualizar parámetro de crimen organizado' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    await prisma.parametroCrimenOrganizado.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Parámetro eliminado correctamente' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al eliminar parámetro de crimen organizado' },
      { status: 500 }
    );
  }
}