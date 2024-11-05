'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export type Causa = {
  id: string;
  denominacionCausa: string;
  ruc: string;
  rit: string;
  victima: string;
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
    accessorKey: 'victima',
    header: 'Víctima'
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
    header: 'Fecha y Hora Toma Conocimiento'
  },

  {
    accessorKey: 'observacion',
    header: 'Observación'
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const causa = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(causa)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(causa.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    }
  }
];

function handleEdit(causa: Causa) {
  // Implementa la lógica de edición aquí
  console.log('Editar causa:', causa);
}

function handleDelete(id: string) {
  // Implementa la lógica de eliminación aquí
  console.log('Eliminar causa con ID:', id);
}
