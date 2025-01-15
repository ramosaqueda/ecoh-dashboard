// app/api/Tribunal/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Obtener un Tribunal específico
      const Tribunal = await prisma.Tribunal.findUnique({
        where: { id: Number(id) }
      });
      if (Tribunal) {
        return NextResponse.json(Tribunal);
      } else {
        return NextResponse.json(
          { message: 'Tribunal no encontrado' },
          { status: 404 }
        );
      }
    } else {
      // Obtener todos los Tribunales
      const Tribunales = await prisma.Tribunal.findMany();
      return NextResponse.json(Tribunales);
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener Tribunal(s)', error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { nombre } = await request.json();
    const Tribunal = await prisma.Tribunal.create({
      data: { nombre }
    });
    return NextResponse.json(Tribunal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al crear Tribunal', error },
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
    const Tribunal = await prisma.Tribunal.update({
      where: { id: Number(id) },
      data: { nombre }
    });
    return NextResponse.json(Tribunal);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al actualizar Tribunal', error },
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
    await prisma.Tribunal.delete({
      where: { id: Number(id) }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al eliminar Tribunal', error },
      { status: 500 }
    );
  }
}
