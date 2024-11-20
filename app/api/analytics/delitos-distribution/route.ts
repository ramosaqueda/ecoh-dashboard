import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = parseInt(
      searchParams.get('year') || new Date().getFullYear().toString()
    );

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const distribution = await prisma.causa.groupBy({
      by: ['delitoId'],
      where: {
        fechaDelHecho: {
          gte: startDate,
          lte: endDate
        }
      },
      _count: true,
      orderBy: {
        _count: {
          delitoId: 'desc'
        }
      }
    });

    const delitos = await prisma.delito.findMany();
    const delitoMap = new Map(delitos.map((d) => [d.id, d.nombre]));

    const result = distribution.reduce(
      (acc, curr) => {
        if (curr.delitoId) {
          const delitoNombre = delitoMap.get(curr.delitoId) || 'Sin clasificar';
          acc[delitoNombre] = curr._count;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching delitos distribution:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
