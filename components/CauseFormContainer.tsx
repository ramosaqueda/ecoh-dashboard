'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CauseForm from '@/components/CausaForm';
import type { CausaFormData } from '@/types/causa';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface CauseFormContainerProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

const CauseFormContainer: React.FC<CauseFormContainerProps> = ({
  isOpen = true,
  onClose,
  onSuccess
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar el cierre del modal
  const handleClose = () => {
    if (!isSubmitting) {
      onClose?.();
    }
  };

  const handleSubmit = async (formData: CausaFormData) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Guardando causa...');

    try {
      const response = await fetch('/api/causas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al guardar la causa');
      }

      const data = await response.json();
      console.log('Causa creada:', data);

      toast.success('Causa guardada exitosamente', {
        id: toastId,
        duration: 3000
      });

      // Ejecutar callback de éxito
      onSuccess?.();

      // Cerrar el modal
      handleClose();

      // Refrescar los datos
      router.refresh();
    } catch (error) {
      console.error('Error al guardar causa:', error);
      toast.error(
        error instanceof Error ? error.message : 'Error al guardar la causa',
        { id: toastId }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-h-[90vh] max-w-[1200px] overflow-y-auto p-0"
        onInteractOutside={(e) => {
          // Prevenir cierre si está enviando
          if (isSubmitting) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Nueva Causa</DialogTitle>
          <DialogDescription>
            Complete los datos para registrar una nueva causa
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-0">
          <CauseForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

          <div className="mt-6 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CauseFormContainer;

// Componente de loading para usar mientras se carga el formulario
const LoadingState = () => (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
  </div>
);
