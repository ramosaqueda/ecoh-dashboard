import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CausaForm from '@/components/forms/CausaForm/';

import { toast } from 'sonner';
import { causaService, ApiError } from '@/lib/services/causaService';
import type { CausaFormData, Causa } from '@/types/causa';
import { Loader2 } from 'lucide-react';

interface CauseFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Partial<Causa> | null;
  isEditing?: boolean;
}

const CauseFormContainer: React.FC<CauseFormContainerProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
  isEditing = false
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<Partial<CausaFormData>>({});

  // Cargar datos iniciales si estamos editando
  React.useEffect(() => {
    const loadInitialData = async () => {
      if (isEditing && initialData?.id) {
        try {
          setIsLoading(true);
          setError(null);
          const causa = await causaService.getById(initialData.id);
          const transformedData = causaService.transformInitialData(causa);
          setFormData(transformedData);
        } catch (err) {
          const message =
            err instanceof ApiError
              ? err.message
              : 'Error al cargar los datos de la causa';
          setError(message);
          toast.error(message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setFormData({});
      }
    };

    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen, isEditing, initialData]);

  const handleClose = () => {
    if (!isSubmitting) {
      setError(null);
      setFormData({});
      onClose();
    }
  };

  const handleSubmit = async (data: CausaFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (isEditing && initialData?.id) {
        await causaService.update(initialData.id, data);
        toast.success('Causa actualizada exitosamente');
      } else {
        await causaService.create(data);
        toast.success('Causa creada exitosamente');
      }

      onSuccess();
      handleClose();
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : `Error al ${isEditing ? 'actualizar' : 'crear'} la causa`;
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderizar estados de carga y error
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-48 items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Cargando datos...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex h-48 flex-col items-center justify-center gap-4">
          <p className="text-sm text-destructive">{error}</p>
          <Button onClick={handleClose} variant="outline">
            Cerrar
          </Button>
        </div>
      );
    }

    return (
      <>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? 'Editar Causa' : 'Nueva Causa'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifique los datos de la causa existente'
              : 'Complete el formulario para crear una nueva causa'}
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-1">
          <CausaForm
            initialValues={formData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isEditing={isEditing}
          />
        </div>
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-h-[90vh] max-w-6xl overflow-hidden p-6"
        onInteractOutside={(e) => {
          // Prevenir cierre al hacer clic fuera si está enviando
          if (isSubmitting) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          // Prevenir cierre con ESC si está enviando
          if (isSubmitting) {
            e.preventDefault();
          }
        }}
      >
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default CauseFormContainer;
