'use client';

import { useState, useEffect } from 'react';
import ActividadForm from '@/components/forms/actividad/ActividadForm';

import ActividadesTable from '@/components/tables/actividades-tables/ActividadesTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function ActividadesPage() {
  const [actividades, setActividades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rucFilter, setRucFilter] = useState('');

  const fetchActividades = async (ruc?: string) => {
    try {
      const url = ruc
        ? `/api/actividades?ruc=${encodeURIComponent(ruc)}`
        : '/api/actividades';

      const response = await fetch(url);
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

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/actividades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Error al crear la actividad');

      await fetchActividades(rucFilter);
      toast.success('Actividad creada exitosamente');
      setDialogOpen(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear la actividad');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRucSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchActividades(rucFilter);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Actividades</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Actividad
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Actividad</DialogTitle>
            </DialogHeader>
            <ActividadForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      <form onSubmit={handleRucSearch} className="flex gap-4">
        <div className="max-w-sm flex-1">
          <Input
            placeholder="Buscar por RUC..."
            value={rucFilter}
            onChange={(e) => setRucFilter(e.target.value)}
          />
        </div>
        <Button type="submit" variant="secondary">
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
        {rucFilter && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setRucFilter('');
              fetchActividades();
            }}
          >
            Limpiar
          </Button>
        )}
      </form>

      {isLoading ? (
        <div className="text-center">Cargando actividades...</div>
      ) : (
        <ActividadesTable
          actividades={actividades}
          onDelete={async (id) => {
            if (window.confirm('¿Está seguro de eliminar esta actividad?')) {
              try {
                const response = await fetch(`/api/actividades?id=${id}`, {
                  method: 'DELETE'
                });
                if (!response.ok) throw new Error('Error al eliminar');
                await fetchActividades(rucFilter);
                toast.success('Actividad eliminada correctamente');
              } catch (error) {
                toast.error('Error al eliminar la actividad');
              }
            }
          }}
        />
      )}
    </div>
  );
}
