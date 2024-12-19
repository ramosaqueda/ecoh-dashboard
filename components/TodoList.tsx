'use client';

import { useCallback, useState } from 'react';
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
import { Edit2, Trash2, CheckSquare } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import TodoList from './TodoList';

interface Actividad {
  id: number;
  causa: {
    ruc: string;
  };
  tipoActividad: {
    nombre: string;
  };
  fechaInicio: string;
  fechaTermino: string;
  observacion: string;
  estado: 'inicio' | 'en_proceso' | 'terminado';
  usuario: {
    email: string;
  };
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
  const [selectedActividadId, setSelectedActividadId] = useState<number | null>(null);
  const [todoDialogOpen, setTodoDialogOpen] = useState(false);

  const formatFecha = useCallback((fecha: string) => {
    return format(new Date(fecha), 'dd/MM/yyyy', { locale: es });
  }, []);

  const handleOpenTodos = (actividadId: number) => {
    setSelectedActividadId(actividadId);
    setTodoDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>RUC</TableHead>
              <TableHead>Tipo de Actividad</TableHead>
              <TableHead>Fecha Inicio</TableHead>
              <TableHead>Fecha Término</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Asignado</TableHead>
              <TableHead>Observaciones</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actividades.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
                  No hay actividades registradas
                </TableCell>
              </TableRow>
            ) : (
              actividades.map((actividad) => (
                <TableRow key={actividad.id}>
                  <TableCell>{actividad.causa.ruc}</TableCell>
                  <TableCell>{actividad.tipoActividad.nombre}</TableCell>
                  <TableCell>{formatFecha(actividad.fechaInicio)}</TableCell>
                  <TableCell>{formatFecha(actividad.fechaTermino)}</TableCell>
                  <TableCell>
                    <Badge className={estadoBadgeColors[actividad.estado]}>
                      {estadoTexto[actividad.estado]}
                    </Badge>
                  </TableCell>
                  <TableCell>{actividad.usuario.email}</TableCell>
                  <TableCell>{actividad.observacion}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenTodos(actividad.id)}
                      >
                        <CheckSquare className="h-4 w-4" />
                      </Button>
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

      <Dialog open={todoDialogOpen} onOpenChange={setTodoDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Tareas de la Actividad</DialogTitle>
          </DialogHeader>
          {selectedActividadId && <TodoList actividadId={selectedActividadId} />}
        </DialogContent>
      </Dialog>
    </>
  );
}