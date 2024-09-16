// app/api/Foco/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Foco } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Obtener un Foco específico
      const Foco = await prisma.Foco.findUnique({
        where: { id: Number(id) }
      });
      if (Foco) {
        return NextResponse.json(Foco);
      } else {
        return NextResponse.json(
          { message: 'Foco no encontrado' },
          { status: 404 }
        );
      }
    } else {
      // Obtener todos los Focos
      const Focos = await prisma.Foco.findMany();
      return NextResponse.json(Focos);
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener Foco(s)', error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { nombre } = await request.json();
    const Foco = await prisma.Foco.create({
      data: { nombre }
    });
    return NextResponse.json(Foco, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al crear Foco', error },
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
    const Foco = await prisma.Foco.update({
      where: { id: Number(id) },
      data: { nombre }
    });
    return NextResponse.json(Foco);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al actualizar Foco', error },
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
    await prisma.Foco.delete({
      where: { id: Number(id) }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al eliminar Foco', error },
      { status: 500 }
    );
  }
}
