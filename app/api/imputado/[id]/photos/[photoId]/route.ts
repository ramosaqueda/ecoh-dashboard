// app/api/imputado/[id]/photos/[photoId]/route.ts
import { NextResponse } from 'next/server';

import { unlink } from 'fs/promises';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function DELETE(
  req: Request,
  { params }: { params: { id: string; photoId: string } }
) {
  try {
    const imputadoId = parseInt(params.id);
    const photoId = parseInt(params.photoId);

    if (isNaN(imputadoId) || isNaN(photoId)) {
      return NextResponse.json({ error: 'IDs inválidos' }, { status: 400 });
    }

    const foto = await prisma.fotografia.findFirst({
      where: {
        id: photoId,
        imputadoId
      }
    });

    if (!foto) {
      return NextResponse.json(
        { error: 'Foto no encontrada' },
        { status: 404 }
      );
    }

    // Si es la foto principal, actualizar el imputado
    if (foto.esPrincipal) {
      // Buscar la siguiente foto disponible
      const siguienteFoto = await prisma.fotografia.findFirst({
        where: {
          imputadoId,
          id: { not: photoId }
        }
      });

      await prisma.imputado.update({
        where: { id: imputadoId },
        data: {
          fotoPrincipal: siguienteFoto ? siguienteFoto.url : null
        }
      });

      if (siguienteFoto) {
        await prisma.fotografia.update({
          where: { id: siguienteFoto.id },
          data: { esPrincipal: true }
        });
      }
    }

    // Eliminar el archivo físico
    const filePath = join(process.cwd(), 'public', foto.url);
    await unlink(filePath).catch(() => {}); // Ignorar error si el archivo no existe

    // Eliminar el registro de la base de datos
    await prisma.fotografia.delete({
      where: { id: photoId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la foto' },
      { status: 500 }
    );
  }
}