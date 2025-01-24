// app/api/atvt/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Obtener un atvt específico
      const atvt = await prisma.atvt.findUnique({
        where: { id: Number(id) }
      });
      if (atvt) {
        return NextResponse.json(atvt);
      } else {
        return NextResponse.json(
          { message: 'Atvt no encontrado' },
          { status: 404 }
        );
      }
    } else {
      // Obtener todos los atvt
      const atvts = await prisma.atvt.findMany();
      return NextResponse.json(atvts);
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener atvt(s)', error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { nombre } = await request.json();
    const atvt = await prisma.atvt.create({
      data: { nombre }
    });
    return NextResponse.json(atvt, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al crear atvt', error },
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
    const atvt = await prisma.atvt.update({
      where: { id: Number(id) },
      data: { nombre }
    });
    return NextResponse.json(atvt);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al actualizar atvt', error },
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
    await prisma.atvt.delete({
      where: { id: Number(id) }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al eliminar atvt', error },
      { status: 500 }
    );
  }
}
