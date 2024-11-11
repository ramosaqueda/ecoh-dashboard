'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  imputado,
  columns
} from '@/components/tables/imputados-tables/columns';
import { imputadosDataTable } from '@/components/tables/imputados-tables/imputados-table';
import ImputadoFormContainer from '@/components/ImputadoFormContainer';
import { toast } from 'sonner';
import { Loader2, Plus } from 'lucide-react';

async function getimputados(): Promise<imputado[]> {
  const res = await fetch('/api/imputado', {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Error al cargar los imputados');
  }
  return res.json();
}

export default function imputadosPage() {
  const [imputados, setimputados] = useState<imputado[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedimputado, setSelectedimputado] = useState<imputado | null>(
    null
  );

  const loadimputados = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getimputados();
      setimputados(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Error al cargar los imputados'
      );
      toast.error('Error al cargar los imputados');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadimputados();
  }, []);

  const handleEdit = async (imputado: imputado) => {
    setSelectedimputado(imputado);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/imputado/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el imputado');
      }

      setimputados(imputados.filter((imputado) => imputado.id !== id));
      toast.success('imputado eliminado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar el imputado');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedimputado(null);
  };

  const handleFormSuccess = () => {
    handleModalClose();
    loadimputados();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Cargando imputados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={loadimputados}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestión de imputados
          </h1>
          <p className="text-muted-foreground">
            Administre los imputados del sistema
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo imputado
        </Button>
      </div>

      <ImputadoFormContainer
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleFormSuccess}
        initialData={selectedimputado}
        isEditing={!!selectedimputado}
      />

      {imputados.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-muted-foreground">No hay imputados registrados</p>
          <Button className="mt-4" onClick={() => setIsModalOpen(true)}>
            Crear primer imputado
          </Button>
        </div>
      ) : (
        <imputadosDataTable
          columns={columns}
          data={imputados}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
