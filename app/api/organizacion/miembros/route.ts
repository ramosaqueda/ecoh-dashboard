import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const MiembroSchema = z.object({
  organizacionId: z.number().int(),
  imputadoId: z.number().int(),
  rol: z.string().optional(),
  fechaIngreso: z.string().transform((str) => new Date(str)),
  fechaSalida: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : null)),
  activo: z.boolean().default(true)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = MiembroSchema.parse(body);

    const miembro = await prisma.miembrosOrganizacion.create({
      data: validatedData,
      include: {
        organizacion: true,
        imputado: true
      }
    });

    return NextResponse.json(miembro, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'El imputado ya es miembro de esta organización' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validatedData = MiembroSchema.parse(body);

    const miembro = await prisma.miembrosOrganizacion.update({
      where: {
        organizacionId_imputadoId: {
          organizacionId: validatedData.organizacionId,
          imputadoId: validatedData.imputadoId
        }
      },
      data: validatedData,
      include: {
        organizacion: true,
        imputado: true
      }
    });

    return NextResponse.json(miembro);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
