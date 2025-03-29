import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const count = searchParams.get('count');
    const causaEcoh = searchParams.get('causaEcoh');
    const causaLegada = searchParams.get('causaLegada');
    const homicidioConsumado = searchParams.get('homicidioConsumado');
    const crimenorg = searchParams.get('esCrimenOrganizado');
    
    // Nuevo parámetro para filtrar por año
    const yearParam = searchParams.get('year');
    
    let whereClause: any = {};

    // Aplicar filtros si están presentes
    if (causaEcoh !== null) {
      whereClause.causaEcoh = causaEcoh === 'true';
    }

    if (causaLegada !== null) {
      whereClause.causaLegada = causaLegada === 'true';
    }

    if (homicidioConsumado !== null) {
      whereClause.homicidioConsumado = homicidioConsumado === 'true';
    }
    
    // Aplicar filtro de año si está presente y no es "todos"
    if (yearParam && yearParam !== 'todos') {
      const year = parseInt(yearParam);
      
      if (isNaN(year)) {
        return NextResponse.json(
          { error: 'El parámetro year debe ser un número válido' },
          { status: 400 }
        );
      }
      
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
      
      whereClause.fechaDelHecho = {
        gte: startDate,
        lte: endDate
      };
    }

    if (crimenorg !== null) {
      // Crear un objeto de condiciones para crimen organizado
      const crimeOrgWhereClause = { 
        esCrimenOrganizado: 0
      };
      
      // Añadir filtro de fechas si se especifica un año que no sea "todos"
      if (yearParam && yearParam !== 'todos') {
        const year = parseInt(yearParam);
        crimeOrgWhereClause['fechaDelHecho'] = {
          gte: new Date(year, 0, 1),
          lte: new Date(year, 11, 31, 23, 59, 59, 999)
        };
      }
      
      const totalCausas = await prisma.causa.count({
        where: crimeOrgWhereClause
      });
      
      return NextResponse.json({ count: totalCausas });
    }

    if (count === 'true') {
      console.log('Contando causas con filtros:', whereClause);
      const totalCausas = await prisma.causa.count({
        where: whereClause
      });
      return NextResponse.json({ count: totalCausas });
    } else {
      const causas = await prisma.causa.findMany({
        where: whereClause,
        include: {
          fiscal: {
            select: {
              id: true,
              nombre: true
            }
          },
          delito: {
            select: {
              id: true,
              nombre: true
            }
          },
          abogado: {
            select: {
              id: true,
              nombre: true
            }
          },
          analista: {
            select: {
              id: true,
              nombre: true
            }
          },
          atvt: {
            select: {
              id: true,
              nombre: true
            }
          },
          _count: {
            select: {
              imputados: true,
              causasRelacionadasMadre: true,
              causasRelacionadasArista: true
            }
          },
          causasCrimenOrg: true
        }
      });

      const formattedCausas = causas.map((causa) => ({
        ...causa,
        fiscal: causa.fiscal
          ? {
              id: causa.fiscal.id,
              nombre: causa.fiscal.nombre
            }
          : null,
        delito: causa.delito
          ? {
              id: causa.delito.id,
              nombre: causa.delito.nombre
            }
          : null,
        _count: {
          imputados: causa._count?.imputados || 0,
          causasRelacionadasMadre: causa._count?.causasRelacionadasMadre || 0,
          causasRelacionadasArista: causa._count?.causasRelacionadasArista || 0
        }
      }));

      return NextResponse.json(formattedCausas);
    }
  } catch (error) {
    console.error('Error fetching causas:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Error fetching causas' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Aseguramos que homicidioConsumado sea booleano
    const transformedData = {
      ...data,
      delitoId: parseInt(data.delito),
      delito: undefined,
      fiscalId: data.fiscalACargo ? parseInt(data.fiscalACargo) : null,
      fiscalACargo: undefined,
      abogadoId: data.abogado ? parseInt(data.abogado) : null,
      abogado: undefined,
      analistaId: data.analista ? parseInt(data.analista) : null,
      analista: undefined,
      atvtId: data.atvt ? parseInt(data.atvt) : null, // Aseguramos que atvtId se establezca correctamente
      atvt: undefined, // Eliminamos el campo atvt del objeto para evitar conflictos
      homicidioConsumado: data.homicidioConsumado ?? false, // Aseguramos valor por defecto
      causasCrimenOrg: data.causasCrimenOrg ?? [],
      esCrimenOrganizado: data.esCrimenOrganizado ? parseInt(data.esCrimenOrganizado) : 2
    };

    console.log('Transformed data before saving:', transformedData); // Agregamos log para debugging

    const newCausa = await prisma.causa.create({
      data: transformedData,
      include: {
        delito: true,
        fiscal: true,
        abogado: true,
        analista: true,
        atvt: true, // Incluimos atvt en la respuesta
        causasCrimenOrg: true,
        _count: {
          select: {
            imputados: true
          }
        }
      }
    });

    return NextResponse.json(newCausa, { status: 201 });
  } catch (error) {
    console.error('Error creating causa:', error); // Mejoramos el logging de errores
    return NextResponse.json(
      { error: 'Error creating causa' },
      { status: 500 }
    );
  }
}