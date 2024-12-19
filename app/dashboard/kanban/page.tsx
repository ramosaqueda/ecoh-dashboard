'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/page-container';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import CausaSelector from '@/components/select/CausaSelector';

interface Actividad {
  id: number;
  causa: {
    id: number;
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
  { 
    id: 'terminado', 
    label: 'Terminado', 
    color: 'bg-green-50 border-green-200' 
  }
];

export default function ActividadesKanban() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [filteredActividades, setFilteredActividades] = useState<Actividad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnlyUserActivities, setShowOnlyUserActivities] = useState(false);
  const [selectedCausaId, setSelectedCausaId] = useState('');

  const fetchActividades = async (onlyUser: boolean = false) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('limit', '1000');
      
      const url = onlyUser 
        ? `/api/actividades/usuario` 
        : `/api/actividades?${params.toString()}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al cargar actividades');
      
      const responseData = await response.json();
      
      // Manejar ambos formatos de respuesta
      let actividadesData = [];
      
      if (onlyUser) {
        // Si es el endpoint de usuario, asumimos que devuelve directamente el array
        actividadesData = Array.isArray(responseData) ? responseData : [];
      } else {
        // Si es el endpoint normal, extraemos data
        actividadesData = responseData.data || [];
      }

      // Verificación adicional de que sea un array
      if (!Array.isArray(actividadesData)) {
        actividadesData = [];
      }

      setActividades(actividadesData);
      filterActividades(actividadesData, selectedCausaId);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar las actividades');
      setActividades([]);
      setFilteredActividades([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterActividades = (actividadesList: Actividad[], causaId: string) => {
    const safeList = Array.isArray(actividadesList) ? actividadesList : [];
    
    if (!causaId) {
      setFilteredActividades(safeList);
      return;
    }
    
    const filtered = safeList.filter(
      actividad => actividad?.causa?.id?.toString() === causaId
    );
    setFilteredActividades(filtered);
  };

  useEffect(() => {
    fetchActividades(showOnlyUserActivities);
  }, [showOnlyUserActivities]);

  useEffect(() => {
    filterActividades(actividades, selectedCausaId);
  }, [selectedCausaId, actividades]);

  const actividadesPorEstado = (estado: string) => {
    return Array.isArray(filteredActividades) 
      ? filteredActividades.filter((actividad) => actividad?.estado === estado)
      : [];
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

      setActividades((prevActividades) => {
        const updatedActividades = prevActividades.map((actividad) =>
          actividad.id === actividadId
            ? { ...actividad, estado: newEstado }
            : actividad
        );
        filterActividades(updatedActividades, selectedCausaId);
        return updatedActividades;
      });

      toast.success('Estado actualizado correctamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar el estado');
      fetchActividades(showOnlyUserActivities);
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
    <PageContainer className="flex h-screen flex-col">
      <div className="flex flex-col space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Tablero de Actividades</h1>
            <div className="flex items-center gap-2">
              <label htmlFor="user-activities" className="text-sm text-muted-foreground">
                Ver solo mis actividades
              </label>
              <Switch
                id="user-activities"
                checked={showOnlyUserActivities}
                onCheckedChange={setShowOnlyUserActivities}
              />
            </div>
          </div>
          
          <div className="w-full max-w-md">
            <CausaSelector
              value={selectedCausaId}
              onChange={(value) => setSelectedCausaId(value)}
            />
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="mt-4 grid h-[calc(100vh-280px)] grid-cols-1 gap-4 md:grid-cols-3">
          {estados.map((estado) => (
            <div key={estado.id} className="flex flex-col rounded-lg border-2">
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
                    className={`flex-1 overflow-y-auto p-2 ${
                      snapshot.isDraggingOver ? 'bg-muted/50' : ''
                    }`}
                  >
                    <div className="space-y-2">
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
                        <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                          No hay actividades en este estado
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </PageContainer>
  );
}