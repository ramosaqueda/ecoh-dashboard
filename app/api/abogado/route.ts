// app/api/Abogado/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Obtener un Abogado específico
      const Abogado = await prisma.Abogado.findUnique({
        where: { id: Number(id) }
      });
      if (Abogado) {
        return NextResponse.json(Abogado);
      } else {
        return NextResponse.json(
          { message: 'Abogado no encontrado' },
          { status: 404 }
        );
      }
    } else {
      // Obtener todos los Abogados
      const Abogados = await prisma.Abogado.findMany();
      return NextResponse.json(Abogados);
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener Abogado(s)', error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { nombre } = await request.json();
    const Abogado = await prisma.Abogado.create({
      data: { nombre }
    });
    return NextResponse.json(Abogado, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al crear Abogado', error },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { message: 'Se requiere ID para actualizar' },
      { status: 400 }
    );
  }

  try {
    const { nombre } = await request.json();
    const Abogado = await prisma.Abogado.update({
      where: { id: Number(id) },
      data: { nombre }
    });
    return NextResponse.json(Abogado);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al actualizar Abogado', error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { message: 'Se requiere ID para eliminar' },
      { status: 400 }
    );
  }

  try {
    await prisma.Abogado.delete({
      where: { id: Number(id) }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al eliminar Abogado', error },
      { status: 500 }
    );
  }
}
