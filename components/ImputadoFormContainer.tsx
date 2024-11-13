'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import ImputadoForm from '@/components/forms/ImputadoForm/ImputadoForm';
import type { imputado } from '@/components/tables/imputados-tables/columns';

interface ImputadoFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: imputado | null;
  isEditing?: boolean;
}

interface ImputadoFormData {
  nombreSujeto: string;
  docId: string;
  nacionalidadId: string;
}

export default function ImputadoFormContainer({
  isOpen,
  onClose,
  onSuccess,
  initialData,
  isEditing = false
}: ImputadoFormContainerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ImputadoFormData) => {
    try {
      setIsSubmitting(true);

      const url = isEditing
        ? `/api/imputado/${initialData?.id}`
        : '/api/imputado';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Error al guardar el imputado');
      }

      toast.success(
        isEditing
          ? 'imputado actualizado exitosamente'
          : 'imputado creado exitosamente'
      );

      onSuccess();
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        isEditing
          ? 'Error al actualizar el imputado'
          : 'Error al crear el imputado'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar imputado' : 'Crear Nuevo imputado'}
          </DialogTitle>
        </DialogHeader>
        <ImputadoForm
          initialValues={initialData || undefined}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
        />
      </DialogContent>
    </Dialog>
  );
}
