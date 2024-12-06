'use client';

import { useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Actividad {
  id: number;
  tipoActividad: {
    nombre: string;
  };
  fechaInicio: string;
  fechaTermino: string;
  estado: 'inicio' | 'en_proceso' | 'terminado';
}

interface ActividadesTableProps {
  actividades: Actividad[];
  onEdit?: (actividad: Actividad) => void;
  onDelete?: (id: number) => void;
}

const estadoBadgeColors = {
  inicio: 'bg-yellow-100 text-yellow-800',
  en_proceso: 'bg-blue-100 text-blue-800',
  terminado: 'bg-green-100 text-green-800'
};

const estadoTexto = {
  inicio: 'Inicio',
  en_proceso: 'En Proceso',
  terminado: 'Terminado'
};

export default function ActividadesTable({
  actividades,
  onEdit,
  onDelete
}: ActividadesTableProps) {
  const formatFecha = useCallback((fecha: string) => {
    return format(new Date(fecha), 'dd/MM/yyyy', { locale: es });
  }, []);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo de Actividad</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Fecha Término</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actividades.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No hay actividades registradas
              </TableCell>
            </TableRow>
          ) : (
            actividades.map((actividad) => (
              <TableRow key={actividad.id}>
                <TableCell>{actividad.tipoActividad.nombre}</TableCell>
                <TableCell>{formatFecha(actividad.fechaInicio)}</TableCell>
                <TableCell>{formatFecha(actividad.fechaTermino)}</TableCell>
                <TableCell>
                  <Badge className={estadoBadgeColors[actividad.estado]}>
                    {estadoTexto[actividad.estado]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(actividad)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(actividad.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
