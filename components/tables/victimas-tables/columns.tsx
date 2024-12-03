'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2, FileText, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { type Victima } from '@/types/causavictima';

export const columns: ColumnDef<Victima>[] = [
  // nombreImputado
  {
    accessorKey: 'nombreVictima',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  // DocID
  {
    accessorKey: 'docId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Doc ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  // Nacionalidad ID
  {
    accessorKey: 'nacionalidad.nombre',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nacionalidad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  // Causas
  {
    id: 'causas',
    header: 'Causas',
    cell: ({ row, table }) => {
      const victima = row.original;
      const { onViewCausas } = table.options.meta || {};
      const causasCount = victima.causas?.length || 0;

      return causasCount > 0 ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewCausas?.(victima)}
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          <span>{causasCount} causa(s)</span>
        </Button>
      ) : (
        <span className="text-sm text-muted-foreground">Sin causas</span>
      );
    }
  },
  // Acciones
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const victima = row.original;
      const { onEdit, onDelete, onView } = table.options.meta || {};

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView?.(victima)}
            title="Ver detalles"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(victima)}
            title="Editar"
          >
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(victima.id)}
            title="Eliminar"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      );
    }
  }
];
