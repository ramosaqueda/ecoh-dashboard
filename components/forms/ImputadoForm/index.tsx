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
import CausaImputadoForm from '@/components/forms/CausaImputadoForm';

import type { Imputado } from '@/components/tables/imputados-tables/columns';

interface ImputadoFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Imputado | null;
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
  const [createdImputadoId, setCreatedImputadoId] = useState<string | null>(null);
  const [showCausaForm, setShowCausaForm] = useState(false);

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

      const result = await response.json();

      toast.success(
        isEditing
          ? 'Imputado actualizado exitosamente'
          : 'Imputado creado exitosamente'
      );

      if (!isEditing) {
        setCreatedImputadoId(result.id);
        setShowCausaForm(true);
      } else {
        onSuccess();
      }
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

  const handleCausaSuccess = () => {
    setShowCausaForm(false);
    onSuccess();
    onClose();
  };

  return (
    <>
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

      {/* Modal para asociar causa después de crear imputado */}
      <Dialog open={showCausaForm} onOpenChange={(open) => {
        if (!open) {
          setShowCausaForm(false);
          onSuccess();
          onClose();
        }
      }}>
        <DialogContent className="max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              Asociar a Causa
            </DialogTitle>
          </DialogHeader>
          {createdImputadoId && (
            <CausaImputadoForm
              imputadoId={createdImputadoId}
              onSuccess={handleCausaSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}