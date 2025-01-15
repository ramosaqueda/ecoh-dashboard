// app/api/imputado/[id]/photos/[photoId]/principal/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  req: Request,
  { params }: { params: { id: string; photoId: string } }
) {
  try {
    const imputadoId = parseInt(params.id);
    const photoId = parseInt(params.photoId);

    if (isNaN(imputadoId) || isNaN(photoId)) {
      return NextResponse.json({ error: 'IDs inválidos' }, { status: 400 });
    }

    // Resetear todas las fotos a no principal
    await prisma.fotografia.updateMany({
      where: { imputadoId },
      data: { esPrincipal: false }
    });

    // Establecer la nueva foto principal
    const newPrincipal = await prisma.fotografia.update({
      where: {
        id: photoId,
        imputadoId
      },
      data: { esPrincipal: true }
    });

    // Actualizar la referencia en el imputado
    await prisma.imputado.update({
      where: { id: imputadoId },
      data: { fotoPrincipal: newPrincipal.url }
    });

    return NextResponse.json(newPrincipal);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al establecer la foto principal' },
      { status: 500 }
    );
  }
}
