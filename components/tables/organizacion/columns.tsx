import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export type Organization = {
  id: string;
  nombre: string;
  descripcion?: string;
  fechaIdentificacion: Date;
  activa: boolean;
  tipoOrganizacion: {
    id: string;
    nombre: string;
  };
};

export const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: 'nombre',
    header: 'Nombre'
  },
  {
    accessorKey: 'tipoOrganizacion.nombre',
    header: 'Tipo'
  },
  {
    accessorKey: 'fechaIdentificacion',
    header: 'Fecha de Identificación',
    cell: ({ row }) => {
      return format(
        new Date(row.getValue('fechaIdentificacion')),
        'dd/MM/yyyy'
      );
    }
  },
  {
    accessorKey: 'activa',
    header: 'Estado',
    cell: ({ row }) => {
      return row.getValue('activa') ? 'Activa' : 'Inactiva';
    }
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const organization = row.original;

      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.options.meta?.onEdit(organization)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.options.meta?.onDelete(organization)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    }
  }
];
