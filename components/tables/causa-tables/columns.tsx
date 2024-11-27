// components/tables/causa-tables/columns.tsx
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2, Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import ImputadosDrawer from '@/components/drawer/imputados-drawer';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

export type Causa = {
  id: string;
  denominacionCausa: string;
  ruc: string;
  rit: string;
  rut: string;
  observacion: string;
  foliobw: string;
  fechaHoraTomaConocimiento: string;
  causaEcoh: boolean;
  fiscalId: string;
  delitoId: string;
  _count?: {
    imputados: number;
  };
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return '-';
  try {
    return format(parseISO(dateString), 'dd/MM/yyyy HH:mm', { locale: es });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

const ImputadosCell = ({ causa }: { causa: Causa }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imputados, setImputados] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/causas-imputados?causaId=${causa.id}`);
      if (!response.ok) throw new Error('Error al cargar los imputados');
      const data = await response.json();
      setImputados(data);
      setIsOpen(true);
    } catch (error) {
      console.error('Error loading imputados:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          'No se pudieron cargar los imputados. Por favor, intente nuevamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1"
        onClick={handleClick}
        disabled={isLoading}
      >
        <Users className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        <span>{causa._count?.imputados || 0} </span>
      </Button>

      <ImputadosDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        imputados={imputados}
        causaRuc={causa.ruc}
      />
    </>
  );
};

export const columns: ColumnDef<Causa>[] = [
  {
    accessorKey: 'denominacionCausa',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Denominación Causa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'ruc',
    header: 'RUC'
  },
  {
    accessorKey: 'rit',
    header: 'RIT'
  },
  {
    accessorKey: 'fiscal.nombre',
    header: 'Fiscal'
  },
  {
    accessorKey: 'foliobw',
    header: 'Folio BW'
  },
  {
    accessorKey: 'causaEcoh',
    header: 'Causa ECOH',
    cell: ({ row }) => (row.getValue('causaEcoh') ? 'Sí' : 'No')
  },
  {
    accessorKey: 'fechaHoraTomaConocimiento',
    header: 'Fecha Toma Conocimiento',
    cell: ({ row }) => {
      const fecha = row.getValue('fechaHoraTomaConocimiento') as string;
      return fecha
        ? format(new Date(fecha), 'dd/MM/yyyy HH:mm', { locale: es })
        : '-';
    }
  },
  {
    accessorKey: 'observacion',
    header: 'Observación'
  },
  {
    accessorKey: 'abogado.nombre',
    header: 'Abogado'
  },
  {
    accessorKey: 'analista.nombre',
    header: 'Analista'
  },
  {
    id: 'imputados',
    header: 'Imputados',
    cell: ({ row }) => <ImputadosCell causa={row.original} />
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const causa = row.original;
      const { onEdit, onDelete } = table.options.meta || {};

      return (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/causas/view/${causa.id}`} passHref>
            <Button variant="ghost" size="icon" title="Ver detalles">
              <Eye className="h-4 w-4 text-primary" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(causa)}
            title="Editar"
          >
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(causa.id)}
            title="Eliminar"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      );
    }
  }
];
