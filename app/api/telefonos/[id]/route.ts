// app/api/telefonos/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const telefono = await prisma.telefono.findUnique({
      where: {
        id: parseInt(params.id)
      },
      include: {
        proveedorServicio: true,
        telefonosCausa: {
          include: {
            causa: true
          }
        }
      }
    });

    if (!telefono) {
      return NextResponse.json(
        { error: 'Teléfono no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(telefono);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener teléfono' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const telefono = await prisma.telefono.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        numeroTelefonico: body.numeroTelefonico,
        idProveedorServicio: parseInt(body.idProveedorServicio), // Convertir a número
        imei: body.imei,
        abonado: body.abonado,
        solicitaTrafico: body.solicitaTrafico,
        solicitaImei: body.solicitaImei,
        observacion: body.observacion
      },
      include: {
        proveedorServicio: true
      }
    });

    return NextResponse.json(telefono);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar teléfono' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.telefono.delete({
      where: {
        id: parseInt(params.id)
      }
    });

    return NextResponse.json({ message: 'Teléfono eliminado exitosamente' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar teléfono' },
      { status: 500 }
    );
  }
}
