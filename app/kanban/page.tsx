'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/page-container';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Actividad {
  id: number;
  causa: {
    ruc: string;
    denominacionCausa: string;
  };
  tipoActividad: {
    nombre: string;
  };
  fechaInicio: string;
  fechaTermino: string;
  estado: 'inicio' | 'en_proceso' | 'terminado';
}

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Kanban Actividades', link: '/dashboard/actividades-kanban' }
];

const estados = [
  {
    id: 'inicio',
    label: 'Por Iniciar',
    color: 'bg-yellow-50 border-yellow-200'
  },
  {
    id: 'en_proceso',
    label: 'En Proceso',
    color: 'bg-blue-50 border-blue-200'
  },
  { id: 'terminado', label: 'Terminado', color: 'bg-green-50 border-green-200' }
];

export default function ActividadesKanban() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchActividades = async () => {
    try {
      const response = await fetch('/api/actividades/usuario');
      if (!response.ok) throw new Error('Error al cargar actividades');
      const data = await response.json();
      setActividades(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar las actividades');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  const actividadesPorEstado = (estado: string) => {
    return actividades.filter((actividad) => actividad.estado === estado);
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newEstado = destination.droppableId;
    const actividadId = parseInt(draggableId);

    try {
      const response = await fetch(`/api/actividades?id=${actividadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estado: newEstado
        })
      });

      if (!response.ok) throw new Error('Error al actualizar el estado');

      // Actualizar estado local
      setActividades((prevActividades) =>
        prevActividades.map((actividad) =>
          actividad.id === actividadId
            ? { ...actividad, estado: newEstado }
            : actividad
        )
      );

      toast.success('Estado actualizado correctamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar el estado');
      // Recargar actividades en caso de error
      fetchActividades();
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-2xl font-bold">Tablero de Actividades</h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {estados.map((estado) => (
              <div key={estado.id} className="flex flex-col">
                <div className={`rounded-t-lg p-4 ${estado.color}`}>
                  <h2 className="font-semibold">{estado.label}</h2>
                  <div className="text-sm text-muted-foreground">
                    {actividadesPorEstado(estado.id).length} actividades
                  </div>
                </div>

                <Droppable droppableId={estado.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[500px] flex-1 rounded-b-lg border-2 ${
                        estado.color
                      } p-2 ${snapshot.isDraggingOver ? 'bg-muted/50' : ''}`}
                    >
                      {actividadesPorEstado(estado.id).map(
                        (actividad, index) => (
                          <Draggable
                            key={actividad.id}
                            draggableId={actividad.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2"
                              >
                                <Card
                                  className={`transition-shadow hover:shadow-md ${
                                    snapshot.isDragging ? 'shadow-lg' : ''
                                  }`}
                                >
                                  <CardContent className="space-y-2 p-4">
                                    <div className="font-medium">
                                      {actividad.tipoActividad.nombre}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      RUC: {actividad.causa.ruc}
                                    </div>
                                    <div className="line-clamp-2 text-sm text-muted-foreground">
                                      {actividad.causa.denominacionCausa}
                                    </div>
                                    <div className="border-t pt-2 text-xs text-muted-foreground">
                                      <div>
                                        Inicio:{' '}
                                        {format(
                                          new Date(actividad.fechaInicio),
                                          'dd/MM/yyyy',
                                          { locale: es }
                                        )}
                                      </div>
                                      <div>
                                        Término:{' '}
                                        {format(
                                          new Date(actividad.fechaTermino),
                                          'dd/MM/yyyy',
                                          { locale: es }
                                        )}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        )
                      )}
                      {provided.placeholder}
                      {actividadesPorEstado(estado.id).length === 0 && (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No hay actividades en este estado
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </PageContainer>
  );
}
