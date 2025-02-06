'use client';

import { useState, useEffect } from 'react';
import ActividadForm from '@/components/forms/actividad/ActividadForm';
import { ActividadesTable } from '@/components/tables/actividades-tables/ActividadesTable';
import { columns } from '@/components/tables/actividades-tables/columns';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Actividad {
  id: number;
  causa: {
    id: number;
    ruc: string;
  };
  tipoActividad: {
    id: number;
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

interface ActividadEditing {
  id?: number;
  causaId: string;
  tipoActividadId: string;
  fechaInicio: string;
  fechaTermino: string;
  estado: 'inicio' | 'en_proceso' | 'terminado';
  observacion?: string;
}

interface TipoActividad {
  id: number;
  nombre: string;
}

export default function ActividadesPage() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [tiposActividad, setTiposActividad] = useState<TipoActividad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tipoActividadFilter, setTipoActividadFilter] = useState('all');
  const [actividadEditing, setActividadEditing] = useState<ActividadEditing | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchTiposActividad = async () => {
    try {
      const response = await fetch('/api/tipos-actividad');
      if (!response.ok) throw new Error('Error al cargar tipos de actividad');
      const data = await response.json();
      setTiposActividad(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar los tipos de actividad');
    }
  };

  const fetchActividades = async (tipoId?: string, pageNum: number = 1) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      
      if (tipoId && tipoId !== 'all') {
        params.append('tipo_actividad_id', tipoId);
      }

      params.append('page', pageNum.toString());
      params.append('limit', pageSize.toString());

      const url = `/api/actividades?${params.toString()}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al cargar actividades');
      const { data, metadata } = await response.json();
      
      setTotalRecords(metadata.total);
      setPageCount(Math.ceil(metadata.total / pageSize));
      setActividades(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar las actividades');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTiposActividad();
    fetchActividades();
  }, []);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const url = actividadEditing
        ? `/api/actividades?id=${actividadEditing.id}`
        : '/api/actividades';

      const method = actividadEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Error al guardar la actividad');

      setPageIndex(1);
      await fetchActividades(tipoActividadFilter, 1);
      toast.success(
        actividadEditing
          ? 'Actividad actualizada exitosamente'
          : 'Actividad creada exitosamente'
      );
      setDialogOpen(false);
      setActividadEditing(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al guardar la actividad');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearFilters = () => {
    setTipoActividadFilter('all');
    setPageIndex(1);
    fetchActividades(undefined, 1);
  };

  const handleEdit = (actividad: Actividad) => {
    setActividadEditing({
      id: actividad.id,
      causaId: actividad.causa.id.toString(),
      tipoActividadId: actividad.tipoActividad.id.toString(),
      fechaInicio: actividad.fechaInicio.split('T')[0],
      fechaTermino: actividad.fechaTermino.split('T')[0],
      estado: actividad.estado,
      observacion: actividad.observacion
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    setDeleteId(id);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`/api/actividades?id=${deleteId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar');
      setPageIndex(1);
      await fetchActividades(tipoActividadFilter, 1);
      toast.success('Actividad eliminada correctamente');
    } catch (error) {
      toast.error('Error al eliminar la actividad');
    } finally {
      setShowDeleteAlert(false);
      setDeleteId(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPageIndex(newPage);
    fetchActividades(tipoActividadFilter, newPage);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Actividades</h1>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setActividadEditing(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Actividad
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {actividadEditing ? 'Editar Actividad' : 'Nueva Actividad'}
              </DialogTitle>
            </DialogHeader>
            <ActividadForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              initialData={actividadEditing}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <Select
          value={tipoActividadFilter}
          onValueChange={(value) => {
            setTipoActividadFilter(value);
            setPageIndex(1);
            fetchActividades(value, 1);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tipo de Actividad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {tiposActividad.map((tipo) => (
              <SelectItem key={tipo.id} value={tipo.id.toString()}>
                {tipo.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {tipoActividadFilter !== 'all' && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleClearFilters}
          >
            Limpiar
          </Button>
        )}
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esta acción eliminará permanentemente la actividad
              y los datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isLoading ? (
        <div className="text-center">Cargando actividades...</div>
      ) : (
        <ActividadesTable
          columns={columns}
          data={actividades}
          onEdit={handleEdit}
          onDelete={handleDelete}
          pageSize={pageSize}
          pageIndex={pageIndex}
          pageCount={pageCount}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}