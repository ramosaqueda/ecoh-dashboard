import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: Request, 
    { params }: {params: { id: string} }
) {
    console.log(params.id);
    try {
        const id = parseInt(params.id);

        if(!id || isNaN(id)) {
            return NextResponse.json(
                { error: 'ID de causa inválido' },
                { status: 400}
            );
        }

        const causaCrimenOrg = await prisma.causasCrimenOrganizado.findMany({
            where: { id: id}, 
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
    console.log('Entró al controlador PUT');
    try {
        const data = await req.json();
        const id = params.id;
        const { parametroId, estado } = data;
       
        if (!id) {
            return NextResponse.json(
                { error: 'Se requiere el ID de la causa' },
                { status: 400 }
            );
        }

        const updateData = {
            estado: estado || false,
        };

        const causaCrimenOrg = await prisma.causasCrimenOrganizado.update({
            where: {
                id_parametroId : {
                    id: parseInt(id),
                    parametroId: parseInt(parametroId)
                }
            },
            data: updateData,
            include: {
                parametro: true,
                causa: true,
            }
        });
        
        return NextResponse.json(causaCrimenOrg);
    } catch (error) {
        console.error('Error updating causa: ', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string }}) {
    try {
        const data = await req.json();
        console.log(data);
        const id = await parseInt(params.id);
        const paramId = parseInt(data.paramId);
        const estado = data.estado;
        console.log(paramId);
        console.log(estado);
        const causaCrimenOrg = await prisma.causasCrimenOrganizado.create({
            data: {
                id: id,
                parametroId: paramId,
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
