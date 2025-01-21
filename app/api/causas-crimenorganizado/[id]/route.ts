import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: Request, 
    { params }: {params: { id: string} }
) {
    try {
        const causaId = parseInt(params.id);

        if(!causaId || isNaN(causaId)) {
            return NextResponse.json(
                { error: 'ID de causa inválido' },
                { status: 400}
            );
        }

        const causaCrimenOrg = await prisma.causasCrimenOrganizado.findMany({
            where: { causaId: causaId}, 
            include: {
                parametro: true,
                causa: {
                    select: {
                       esCrimenOrganizado: true
                    }
                }
            }
        });

        if(!causaCrimenOrg) {
            return NextResponse.json(
                { error: 'Datos no encontrados' },
                { status: 404 }
            )
        }

        return NextResponse.json(causaCrimenOrg);
    } catch (error) {
        console.error('Error fetching causa: ', error);
        return NextResponse.json(
            { error: 'Error fetching causa' },
            { status: 500 }
        );
    }
    
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string }}
) {
    try {
        const data = await req.json();
        const causaId = parseInt(params.id);

        const { paramId, estado } = data;

        const updateData = {
            estado: estado || null,
        };

        const causaCrimenOrg = await prisma.causasCrimenOrganizado.update({
            where: {
                causaId_parametroId: {
                    causaId: causaId,
                    parametroId: paramId
                }
            },
            data: updateData,
        })
        
        return NextResponse.json(causaCrimenOrg);
    } catch (error) {
        console.error('Error updating causa: ', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const { causaId, paramId, estado } = data;

        const causaCrimenOrg = await prisma.causasCrimenOrganizado.create({
            data: {
                causaId: parseInt(causaId),
                parametroId: parseInt(paramId),
                estado: estado ?? null

            },
            include: {
                causa: true,
                parametro: true
            }
        });

        return NextResponse.json(causaCrimenOrg, {status: 201});
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: 'Error al agregar parámetro a causa', error },
            { status: 500 }
        );
    }

}
