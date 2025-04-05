// app/api/imputado-causas/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Usar el mismo formato de parámetros que tu endpoint existente
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    console.log(`Buscando causas para imputado ID: ${id}`);

    // Intenta obtener el imputado con sus causas
    // Usar la estructura exacta de relaciones que funciona en tu endpoint existente
    const imputado = await prisma.imputado.findUnique({
      where: { id },
      include: {
        causas: {
          include: {
            causa: {
              include: {
                delito: true,
                tribunal: true
              }
            },
            cautelar: true
          }
        }
      }
    });

    if (!imputado) {
      return NextResponse.json(
        { message: 'Imputado no encontrado' },
        { status: 404 }
      );
    }

    // Extraer y formatear solo las causas
    const causas = imputado.causas.map(rel => ({
      id: rel.causa.id,
      ruc: rel.causa.ruc,
      denominacion: rel.causa.denominacionCausa,
      fechaHecho: rel.causa.fechaDelHecho,
      delito: rel.causa.delito?.nombre || 'Sin delito asignado',
      tribunal: rel.causa.tribunal?.nombre,
      esImputado: rel.esImputado,
      esSujetoInteres: rel.essujetoInteres,
      formalizado: rel.formalizado,
      fechaFormalizacion: rel.fechaFormalizacion,
      cautelar: rel.cautelar?.nombre,
      causaImputadoId: rel.id
    }));

    // Filtrar para excluir la causa actual (si se proporciona en la query)
    const causaIdExcluir = request.nextUrl.searchParams.get('excluir');
    
    let causasFiltradas = causas;
    if (causaIdExcluir) {
      const causaIdExcluirNum = parseInt(causaIdExcluir);
      if (!isNaN(causaIdExcluirNum)) {
        causasFiltradas = causas.filter(c => c.id !== causaIdExcluirNum);
      }
    }

    return NextResponse.json(causasFiltradas);
  } catch (error) {
    console.error('Error al obtener causas del imputado:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor', error: error.message },
      { status: 500 }
    );
  }
}