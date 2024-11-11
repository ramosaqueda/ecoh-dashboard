'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export type Causa = {
  id: string;
  denominacionCausa: string;
  ruc: string;
  rit: string;
  rut: string;
  observacion: string;
  foliobw: string;
  fechaHoraTomaConocimiento: string;
  sinLlamadoEcoh: boolean;
  fiscalId: string;
  delitoId: string;
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
    accessorKey: 'rut',
    header: 'RUT'
  },
  {
    accessorKey: 'fiscalId',
    header: 'Fiscal ID'
  },
  {
    accessorKey: 'foliobw',
    header: 'Folio BW'
  },
  {
    accessorKey: 'sinLlamadoEcoh',
    header: 'Sin Llamado ECOH',
    cell: ({ row }) => (row.getValue('sinLlamadoEcoh') ? 'Sí' : 'No')
  },
  {
    accessorKey: 'fechaHoraTomaConocimiento',
    header: 'Fecha y Hora Toma Conocimiento',
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
    id: 'actions',
    cell: ({ row, table }) => {
      const causa = row.original;
      const { onEdit, onDelete } = table.options.meta || {};

      return (
        <div className="flex items-center gap-2">
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
