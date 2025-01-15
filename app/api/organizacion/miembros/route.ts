import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const MiembroSchema = z.object({
  organizacionId: z.number().int(),
  imputadoId: z.number().int(),
  rol: z.string().optional(),
  fechaIngreso: z.string().transform((str) => new Date(str)),
  fechaSalida: z
    .union([z.string().transform((str) => new Date(str)), z.null()])
    .nullable()
    .optional(),
  activo: z.boolean().default(true)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received data:', body);
    const validatedData = MiembroSchema.parse(body);
    console.log('Validated data:', validatedData);

    // Intentar crear el nuevo miembro
    const miembro = await prisma.miembrosOrganizacion.create({
      data: {
        organizacionId: validatedData.organizacionId,
        imputadoId: validatedData.imputadoId,
        rol: validatedData.rol,
        fechaIngreso: validatedData.fechaIngreso,
        fechaSalida: validatedData.fechaSalida,
        activo: validatedData.activo
      },
      include: {
        organizacion: true,
        imputado: true
      }
    });

    return NextResponse.json(miembro, { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Error de validación', details: error.errors },
        { status: 400 }
      );
    }
    // Si el miembro ya existe, devolver un error 409
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'El imputado ya es miembro de esta organización' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error },
      { status: 500 }
    );
  }
}
