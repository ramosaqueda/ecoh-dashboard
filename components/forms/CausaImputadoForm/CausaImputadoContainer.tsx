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
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import CausaImputadoForm from './index';

interface CausaImputadoContainerProps {
  imputadoId: string;
  onSuccess?: () => void;
}

export default function CausaImputadoContainer({
  imputadoId,
  onSuccess
}: CausaImputadoContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/causas-imputados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          imputadoId: parseInt(imputadoId)
        })
      });

      if (!response.ok) {
        throw new Error('Error al asociar la causa');
      }

      toast.success('Causa asociada exitosamente');
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al asociar la causa');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Asociar a Causa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Asociar Imputado a Causa</DialogTitle>
        </DialogHeader>
        <CausaImputadoForm
          imputadoId={imputadoId}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onSuccess={() => {
            setIsOpen(false);
            onSuccess?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
