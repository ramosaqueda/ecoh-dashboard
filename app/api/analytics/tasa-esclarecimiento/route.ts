import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = parseInt(
      searchParams.get('year') || new Date().getFullYear().toString()
    );
    const tipoDelito = searchParams.get('tipoDelito');
    const homicidioConsumado = searchParams.get('homicidioConsumado') === 'true';

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    // Base query conditions
    const baseWhere = {
      fechaDelHecho: {
        gte: startDate,
        lte: endDate
      },
      causaEcoh: true,
      ...(tipoDelito && tipoDelito !== 'todos' ? { delitoId: parseInt(tipoDelito) } : {}),
      ...(homicidioConsumado ? { homicidioConsumado: true } : {})
    };

    const totalCausas = await prisma.causa.count({
      where: baseWhere
    });

    const causasImputados = await prisma.causa.findMany({
      where: baseWhere,
      include: {
        imputados: {
          include: {
            cautelar: true,
            imputado: true
          }
        }
      }
    });

    let causasEsclarecidas = 0;

    // Usaremos sets para mantener un registro único de las causas por cada condición
    const causasFormalizadasSet = new Set();
    const causasConCautelarSet = new Set();
    const causasAmbasSituacionesSet = new Set();
    const causasEsclarecidasSet = new Set();

    causasImputados.forEach((causa) => {
      const tieneFormalizados = causa.imputados.some(imp => imp.formalizado);
      const tieneCautelar = causa.imputados.some(imp => imp.cautelarId !== null);

      // Registrar cada condición
      if (tieneFormalizados) {
        
        causasFormalizadasSet.add(causa.id);
      }

      if (tieneCautelar) {
        causasConCautelarSet.add(causa.id);
      }

      // Si tiene ambas condiciones
      if (tieneFormalizados && tieneCautelar) {
        causasAmbasSituacionesSet.add(causa.id);
      }

      // Si tiene al menos una de las condiciones
      if (tieneFormalizados || tieneCautelar) {
        console.log('causa.id', causa.id);
        causasEsclarecidasSet.add(causa.id);
      }
    });

    const porcentaje = totalCausas > 0 
      ? (causasEsclarecidasSet.size / totalCausas) * 100 
      : 0;

    return NextResponse.json({
      totalCausas,
      causasEsclarecidas: causasEsclarecidasSet.size,
      porcentaje,
      detalles: {
        causasFormalizadas: causasFormalizadasSet.size,
        causasConCautelar: causasConCautelarSet.size,
        causasAmbasSituaciones: causasAmbasSituacionesSet.size
      }
    });
  } catch (error) {
    console.error('Error fetching tasa esclarecimiento:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}