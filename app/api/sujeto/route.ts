// app/api/imputados/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const count = searchParams.get('count');

    if (count === 'true') {
      const totalimputados = await prisma.imputado.count();
      return NextResponse.json({ count: totalimputados });
    } else {
      const imputados = await prisma.imputado.findMany({
        select: {
          id: true,
          nombreSujeto: true,
          docId: true,
          nacionalidadId: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return NextResponse.json(imputados);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error fetching imputados' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Received data:', data);

    const transformedData = {
      nombre: data.nombre,
      docId: data.docId,
      nacionalidadId: data.nacionalidadId
    };

    const newimputado = await prisma.imputado.create({
      data: transformedData,
      select: {
        id: true,
        nombre: true,
        docId: true,
        nacionalidadId: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(newimputado, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Error creating imputado' },
      { status: 500 }
    );
  }
}
