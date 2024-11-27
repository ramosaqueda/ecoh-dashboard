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

    // Obtener imputados y sus estados
    const imputados = await prisma.causasImputados.findMany({
      where: {
        causa: {
          fechaDelHecho: {
            gte: startDate,
            lte: endDate
          }
        }
      },
      include: {
        cautelar: true
      }
    });

    // Calcular totales
    const totalImputados = imputados.length;
    const formalizados = imputados.filter((imp) => imp.formalizado).length;
    const noFormalizados = totalImputados - formalizados;

    // Agrupar por medidas cautelares
    const cautelares = imputados.reduce(
      (acc, imp) => {
        if (imp.formalizado && imp.cautelar) {
          acc[imp.cautelar.nombre] = (acc[imp.cautelar.nombre] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    // Construir datos para el Sankey
    const nodes = [
      { id: 'Imputados', color: '#94a3b8' }, // slate-400
      { id: 'Formalizados', color: '#22c55e' }, // green-500
      { id: 'No Formalizados', color: '#ef4444' }, // red-500
      ...Object.keys(cautelares).map((nombre) => ({
        id: nombre,
        color: '#3b82f6' // blue-500
      }))
    ];

    const links = [
      {
        source: 'Imputados',
        target: 'Formalizados',
        value: formalizados
      },
      {
        source: 'Imputados',
        target: 'No Formalizados',
        value: noFormalizados
      },
      ...Object.entries(cautelares).map(([nombre, cantidad]) => ({
        source: 'Formalizados',
        target: nombre,
        value: cantidad
      }))
    ];

    return NextResponse.json({ nodes, links });
  } catch (error) {
    console.error('Error fetching imputados flow:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}