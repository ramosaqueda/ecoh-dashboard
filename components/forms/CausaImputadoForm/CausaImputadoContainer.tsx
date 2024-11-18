'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { UserPlus, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import CausaImputadoForm, { CausaImputadoFormValues } from './index';
import { type CausaImputado } from '@/types/causaimputado';

interface CausaImputadoContainerProps {
  imputadoId: string;
  onSuccess?: () => void;
  isEdit?: boolean;
  initialData?: CausaImputado;
  trigger?: React.ReactNode;
}

export default function CausaImputadoContainer({
  imputadoId,
  onSuccess,
  isEdit = false,
  initialData,
  trigger
}: CausaImputadoContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: CausaImputadoFormValues) => {
    try {
      setIsSubmitting(true);
      const formData = {
        ...data,
        imputadoId,
        fechaFormalizacion: data.formalizado ? data.fechaFormalizacion : null,
        cautelarId: data.cautelarId || null
      };

      const response = await fetch(
        '/api/causas-imputados' + (isEdit ? `/${initialData?.causaId}` : ''),
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Error al ${isEdit ? 'actualizar' : 'asociar'} la causa`
        );
      }

      toast.success(
        `Causa ${isEdit ? 'actualizada' : 'asociada'} exitosamente`
      );
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        error.message ||
          `Error al ${isEdit ? 'actualizar' : 'asociar'} la causa`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="flex items-center gap-2">
      {isEdit ? (
        <Pencil className="h-4 w-4" />
      ) : (
        <UserPlus className="h-4 w-4" />
      )}
      {isEdit ? 'Editar Causa' : 'Asociar a Causa'}
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Editar Causa Asociada' : 'Asociar Imputado a Causa'}
          </DialogTitle>
        </DialogHeader>
        <CausaImputadoForm
          imputadoId={imputadoId}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEdit={isEdit}
          initialData={initialData}
        />
      </DialogContent>
    </Dialog>
  );
}
