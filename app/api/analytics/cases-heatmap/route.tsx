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

    // Obtener casos agrupados por fecha
    const cases = await prisma.causa.groupBy({
      by: ['fechaDelHecho'],
      where: {
        fechaDelHecho: {
          gte: startDate,
          lte: endDate,
          not: null
        }
      },
      _count: true
    });

    // Crear array con todos los días del año
    const allDays = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      allDays.push({
        date: currentDate.toISOString().split('T')[0],
        count: 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Llenar con datos reales
    cases.forEach((caseData) => {
      if (caseData.fechaDelHecho) {
        const dateStr = caseData.fechaDelHecho.toISOString().split('T')[0];
        const dayIndex = allDays.findIndex((d) => d.date === dateStr);
        if (dayIndex !== -1) {
          allDays[dayIndex].count = caseData._count;
        }
      }
    });

    return NextResponse.json(allDays);
  } catch (error) {
    console.error('Error fetching cases heatmap:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
