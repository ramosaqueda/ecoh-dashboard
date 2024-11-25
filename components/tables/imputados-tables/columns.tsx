// columns.tsx
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2, FileText, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { type Imputado } from '@/types/causaimputado';

export const columns: ColumnDef<Imputado>[] = [
  // nombreImputado
  {
    accessorKey: 'nombreSujeto',
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
      const imputado = row.original;
      const { onViewCausas } = table.options.meta || {};
      const causasCount = imputado.causas?.length || 0;

      return causasCount > 0 ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewCausas?.(imputado)}
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
      const imputado = row.original;
      const { onEdit, onDelete, onView } = table.options.meta || {};

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView?.(imputado)}
            title="Ver detalles"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(imputado)}
            title="Editar"
          >
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(imputado.id)}
            title="Eliminar"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      );
    }
  }
];
