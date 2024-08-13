'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Causa } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<Causa>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'RUC',
    header: 'RUC'
  },
  {
    accessorKey: 'DENOMINACIONCAUSA',
    header: 'DENOMINACION CAUSA'
  },
  {
    accessorKey: 'DELITO',
    header: 'DELITO'
  },
  {
    accessorKey: 'FECHADELHECHO',
    header: 'FEHCA DEL HECHO'
  },
  {
    accessorKey: 'FISCALACARGO',
    header: 'FISCAL A CARGO'
  },
  {
    accessorKey: 'ANALISTA',
    header: 'ANALISTA'
  },
  {
    accessorKey: 'ABOGADO',
    header: 'ABOGADO'
  },
  {
    accessorKey: 'VICITMA',
    header: 'VICTIMA'
  },

  {
    accessorKey: 'RUTDELA_VICTIMA',
    header: 'RUN DE LA VICTIMA'
  },

  {
    accessorKey: 'NACIONALIDAD',
    header: 'NACIONALIDAD'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
