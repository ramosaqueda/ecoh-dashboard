'use client';

import { useState } from 'react';
import FormMedIntrusiva from '@/components/forms/MedidasIntrusivas/FormMedIntrusiva';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface OrdenFormData {
  causaId: string;
  fiscalSolicitante: string;
  fechaSolicitud: string;
  tribunal: string;
  nombreJuez: string;
  unidadPolicial: string;
  delito: string;
  resolucion: 'aprueba_totalidad' | 'aprueba_parcialmente' | 'previo_resolver' | 'rechaza';
  numDomiciliosSolicitud: string;
  numDomiciliosAprobados: string;
  numDetenidos: string;
  hallazgos?: string[];
  observaciones?: string;
}

export default function OrdenesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (data: OrdenFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/medidas-intrusiva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Error al guardar la orden');
      }

      toast.success('Orden creada exitosamente');
      setDialogOpen(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al guardar la orden');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Órdenes</h1>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Orden
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nueva Orden</DialogTitle>
            </DialogHeader>
            <FormMedIntrusiva
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Aquí puedes agregar una tabla para mostrar las órdenes existentes,
          similar a como se hace en ActividadesTable */}
      <div className="rounded-md border">
        <div className="p-4 text-center text-sm text-muted-foreground">
          No hay órdenes registradas
        </div>
      </div>
    </div>
  );
}