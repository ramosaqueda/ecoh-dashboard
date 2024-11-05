'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Causa, columns } from '@/components/tables/causa-tables/columns';
import { CausasDataTable } from '@/components/tables/causa-tables/causas-table';
import CauseFormContainer from '@/components/CauseFormContainer';
import { toast } from 'sonner';
import { Loader2, Plus } from 'lucide-react';

async function getCausas(): Promise<Causa[]> {
  const res = await fetch('http://localhost:3000/api/causas', {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Error al cargar las causas');
  }
  return res.json();
}

export default function CausasPage() {
  const [causas, setCausas] = useState<Causa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar causas
  const loadCausas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getCausas();
      setCausas(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Error al cargar las causas'
      );
      toast.error('Error al cargar las causas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCausas();
  }, []);

  // Manejadores
  const handleEdit = async (causa: Causa) => {
    toast.info('Función de edición en desarrollo');
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/causas/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la causa');
      }

      setCausas(causas.filter((causa) => causa.id !== id));
      toast.success('Causa eliminada exitosamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar la causa');
    }
  };

  // Renderizar estados de carga y error
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Cargando causas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={loadCausas}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestión de Causas
          </h1>
          <p className="text-muted-foreground">
            Administre las causas del sistema
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Causa
        </Button>
      </div>

      {/* Modal de Formulario */}
      <CauseFormContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          loadCausas(); // Recargar la lista después de crear
        }}
      />

      {/* Tabla de Causas */}
      {causas.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-muted-foreground">No hay causas registradas</p>
          <Button className="mt-4" onClick={() => setIsModalOpen(true)}>
            Crear primera causa
          </Button>
        </div>
      ) : (
        <CausasDataTable
          columns={columns}
          data={causas}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
