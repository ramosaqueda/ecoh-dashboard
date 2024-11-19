import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const distribution = await prisma.imputado.groupBy({
      by: ['nacionalidadId'],
      _count: true,
      orderBy: {
        _count: {
          nacionalidadId: 'desc'
        }
      }
    });

    // Obtener nombres de nacionalidades
    const nacionalidades = await prisma.nacionalidad.findMany();
    const nacionalidadMap = new Map(
      nacionalidades.map((n) => [n.id, n.nombre])
    );

    // Crear objeto con nombres de nacionalidades
    const result = distribution.reduce(
      (acc, curr) => {
        if (curr.nacionalidadId) {
          const nacionalidadNombre =
            nacionalidadMap.get(curr.nacionalidadId) || 'Desconocida';
          acc[nacionalidadNombre] = curr._count;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching nationality distribution:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
