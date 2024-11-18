'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, Plus } from 'lucide-react';
import NacionalidadSelect from '@/components/select/NacionalidadSelect';
import CausaImputadoContainer from '@/components/forms/CausaImputadoForm/CausaImputadoContainer';

import { Separator } from '@/components/ui/separator';
import { CausaImputado } from '@/types/causaimputado';

import { CausasGrid } from '@/components/forms/ImputadoForm/CausasGrid';

import { useQuery, useQueryClient } from '@tanstack/react-query';

const ImputadoFormSchema = z.object({
  nombreSujeto: z.string().min(1, 'El nombre es requerido'),
  docId: z.string().min(1, 'El documento de identidad es requerido'),
  nacionalidadId: z.string().min(1, 'La nacionalidad es requerida')
});

export type ImputadoFormValues = z.infer<typeof ImputadoFormSchema>;

export interface ImputadoFormProps {
  initialValues?: Partial<ImputadoFormValues>;
  onSubmit: (data: ImputadoFormValues) => Promise<void>;
  isSubmitting: boolean;
  isEditing: boolean;
  imputadoId?: string;
  onSuccess?: () => void;
}

const ImputadoForm = ({
  initialValues,
  onSubmit,
  isSubmitting,
  isEditing,
  imputadoId,
  onSuccess
}: ImputadoFormProps) => {
  const queryClient = useQueryClient();

  // Query para obtener las causas del imputado usando la ruta correcta
  const { data: causasAsociadas = [], refetch: refetchCausas } = useQuery<
    CausaImputado[]
  >({
    queryKey: ['causas-imputados', imputadoId],
    queryFn: async () => {
      if (!imputadoId) return [];
      const response = await fetch(`/api/causas-imputados/${imputadoId}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || 'Error al cargar las causas asociadas'
        );
      }
      return response.json();
    },
    enabled: !!imputadoId && isEditing // Solo ejecutar si hay ID y estamos en modo edición
  });

  const form = useForm<ImputadoFormValues>({
    resolver: zodResolver(ImputadoFormSchema),
    defaultValues: {
      nombreSujeto: '',
      docId: '',
      nacionalidadId: '',
      ...initialValues
    }
  });

  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  const handleCausaSuccess = async () => {
    // Invalidar y recargar las causas asociadas
    await queryClient.invalidateQueries({
      queryKey: ['causas-imputados', imputadoId]
    });
    // Llamar al callback de éxito si existe
    onSuccess?.();
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="nombreSujeto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ingrese el nombre completo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="docId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento de Identidad</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ingrese el documento de identidad"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nacionalidadId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nacionalidad</FormLabel>
                <FormControl>
                  <NacionalidadSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    error={form.formState.errors.nacionalidadId?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isSubmitting || !isFormDirty}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar'
              )}
            </Button>
          </div>
        </form>
      </Form>

      {isEditing && imputadoId && (
        <>
          <Separator />
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Causas Asociadas</h3>
              <CausaImputadoContainer
                imputadoId={imputadoId}
                onSuccess={handleCausaSuccess}
                trigger={
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Asociar Causa
                  </Button>
                }
              />
            </div>
            <CausasGrid causas={causasAsociadas} />
          </div>
        </>
      )}
    </div>
  );
};

export default ImputadoForm;
