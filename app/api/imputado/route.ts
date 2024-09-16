// app/api/Imputado/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Imputado } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Obtener un Imputado específico
      const Imputado = await prisma.Imputado.findUnique({
        where: { id: Number(id) }
      });
      if (Imputado) {
        return NextResponse.json(Imputado);
      } else {
        return NextResponse.json(
          { message: 'Imputado no encontrado' },
          { status: 404 }
        );
      }
    } else {
      // Obtener todos los Imputados
      const Imputados = await prisma.Imputado.findMany();
      return NextResponse.json(Imputados);
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener Imputado(s)', error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { nombre } = await request.json();
    const Imputado = await prisma.Imputado.create({
      data: { nombre }
    });
    return NextResponse.json(Imputado, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al crear Imputado', error },
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
    const Imputado = await prisma.Imputado.update({
      where: { id: Number(id) },
      data: { nombre }
    });
    return NextResponse.json(Imputado);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al actualizar Imputado', error },
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
    await prisma.Imputado.delete({
      where: { id: Number(id) }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al eliminar Imputado', error },
      { status: 500 }
    );
  }
}
