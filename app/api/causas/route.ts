import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Causa } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const causas: Causa[] = await prisma.causa.findMany();
    return NextResponse.json(causas);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Error fetching causas' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data);
    const newCausa: Causa = await prisma.causa.create({
      data
    });

    return NextResponse.json(newCausa, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Error creating causa' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();
    const updatedCausa: Causa = await prisma.causa.update({
      where: { id: Number(id) },
      data
    });
    return NextResponse.json(updatedCausa);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating causa' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id: deleteId } = await req.json();
    await prisma.causa.delete({
      where: { id: Number(deleteId) }
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting causa' },
      { status: 500 }
    );
  }
}
