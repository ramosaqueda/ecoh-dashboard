import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Causa } from '@prisma/client';
import { countCausas } from '@/lib/dbUtils';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const count = searchParams.get('count');
    const causaEcoh = searchParams.get('causaEcoh');
    const causaLegada = searchParams.get('causaLegada');

    let whereClause: any = {};

    // Aplicar filtros si están presentes
    if (causaEcoh !== null) {
      whereClause.causaEcoh = causaEcoh === 'true';
    }

    if (causaLegada !== null) {
      whereClause.causaLegada = causaLegada === 'true';
    }

    if (count === 'true') {
      const totalCausas = await prisma.causa.count({
        where: whereClause
      });
      return NextResponse.json({ count: totalCausas });
    } else {
      const causas = await prisma.causa.findMany({
        where: whereClause
      });
      return NextResponse.json(causas);
    }
  } catch (error) {
    console.error(error);
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
    const transformedData = {
      ...data,
      // Convertir el ID del delito a número y estructurarlo correctamente
      delitoId: parseInt(data.delito),
      // Eliminar el campo delito ya que usaremos delitoId
      delito: undefined,

      // Hacer lo mismo con otras relaciones si las hay
      fiscalId: data.fiscalACargo ? parseInt(data.fiscalACargo) : null,
      fiscalACargo: undefined,

      abogadoId: data.abogado ? parseInt(data.abogado) : null,
      abogado: undefined,

      analistaId: data.analista ? parseInt(data.analista) : null,
      analista: undefined

      // ... otras transformaciones necesarias
    };

    const newCausa = await prisma.causa.create({
      data: transformedData,
      include: {
        delito: true,
        fiscal: true,
        abogado: true,
        analista: true
        // ... otras relaciones que quieras incluir
      }
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
