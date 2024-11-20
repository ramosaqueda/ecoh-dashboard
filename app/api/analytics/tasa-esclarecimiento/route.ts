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

    // Obtener total de causas del año
    const totalCausas = await prisma.causa.count({
      where: {
        fechaDelHecho: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    // Obtener causas esclarecidas
    const causasImputados = await prisma.causa.findMany({
      where: {
        fechaDelHecho: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        imputados: {
          include: {
            cautelar: true
          }
        }
      }
    });

    let causasFormalizadas = 0;
    let causasConCautelar = 0;
    let causasAmbasSituaciones = 0;
    let causasEsclarecidas = 0;

    causasImputados.forEach((causa) => {
      const tieneFormalizados = causa.imputados.some((imp) => imp.formalizado);
      const tieneCautelar = causa.imputados.some(
        (imp) => imp.cautelarId !== null
      );

      if (tieneFormalizados) causasFormalizadas++;
      if (tieneCautelar) causasConCautelar++;
      if (tieneFormalizados && tieneCautelar) causasAmbasSituaciones++;
      if (tieneFormalizados || tieneCautelar) causasEsclarecidas++;
    });

    const porcentaje = (causasEsclarecidas / totalCausas) * 100;

    return NextResponse.json({
      totalCausas,
      causasEsclarecidas,
      porcentaje,
      detalles: {
        causasFormalizadas,
        causasConCautelar,
        causasAmbasSituaciones
      }
    });
  } catch (error) {
    console.error('Error fetching tasa esclarecimiento:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
