// app/dashboard/telefonos/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Telefono, columns } from '@/components/tables/telefono-tables/columns';
import { TelefonosDataTable } from '@/components/tables/telefono-tables/telefonos-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { TelefonoForm } from '@/components/forms/Telefonos/telefono-form';
import { TelefonoCausaManager } from '@/components/forms/Telefonos/TelefonoCausaManager';
import { toast } from 'sonner';
import { Loader2, Plus } from 'lucide-react';

async function getTelefonos(): Promise<Telefono[]> {
  const res = await fetch('/api/telefonos', {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Error al cargar los teléfonos');
  }
  return res.json();
}

export default function TelefonosPage() {
  const [telefonos, setTelefonos] = useState<Telefono[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTelefono, setSelectedTelefono] = useState<Telefono | null>(
    null
  );

  const loadTelefonos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTelefonos();
      setTelefonos(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Error al cargar los teléfonos'
      );
      toast.error('Error al cargar los teléfonos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTelefonos();
  }, []);

  const handleEdit = async (telefono: Telefono) => {
    setSelectedTelefono(telefono);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/telefonos/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el teléfono');
      }

      setTelefonos(telefonos.filter((telefono) => telefono.id !== id));
      toast.success('Teléfono eliminado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar el teléfono');
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      const url = selectedTelefono
        ? `/api/telefonos/${selectedTelefono.id}`
        : '/api/telefonos';
      const method = selectedTelefono ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(
          `Error al ${selectedTelefono ? 'actualizar' : 'crear'} el teléfono`
        );
      }

      toast.success(
        `Teléfono ${selectedTelefono ? 'actualizado' : 'creado'} exitosamente`
      );
      setIsModalOpen(false);
      setSelectedTelefono(null);
      loadTelefonos();
    } catch (error) {
      toast.error('Error al procesar la solicitud');
    }
  };

  // Manejador para actualizar la tabla cuando se modifiquen las causas
  const handleCausaChange = async () => {
    await loadTelefonos();
  };

  // Actualizar un teléfono específico en la tabla
  const updateTelefonoInTable = (updatedTelefono: Telefono) => {
    setTelefonos((prevTelefonos) =>
      prevTelefonos.map((tel) =>
        tel.id === updatedTelefono.id ? updatedTelefono : tel
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Cargando teléfonos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={loadTelefonos}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestión de Teléfonos
          </h1>
          <p className="text-muted-foreground">
            Administre los teléfonos del sistema
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Teléfono
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedTelefono ? 'Editar Teléfono' : 'Nuevo Teléfono'}
            </DialogTitle>
          </DialogHeader>
          <TelefonoForm
            initialData={selectedTelefono}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedTelefono(null);
            }}
          />
          {selectedTelefono && (
            <div className="mt-6 border-t pt-6">
              <TelefonoCausaManager
                telefonoId={parseInt(selectedTelefono.id)}
                initialCausas={selectedTelefono.telefonosCausa}
                onCausaChange={handleCausaChange}
                onUpdate={updateTelefonoInTable}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {telefonos.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-muted-foreground">No hay teléfonos registrados</p>
          <Button className="mt-4" onClick={() => setIsModalOpen(true)}>
            Registrar primer teléfono
          </Button>
        </div>
      ) : (
        <TelefonosDataTable
          columns={columns}
          data={telefonos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
