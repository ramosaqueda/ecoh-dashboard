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
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// Esquema de validación
const formSchema = z.object({
  nombreSujeto: z.string().min(1, 'El nombre es requerido'),
  docId: z.string().min(1, 'El documento de identidad es requerido'),
  nacionalidadId: z.string().nullable().optional()
});

// Tipo inferido del esquema
type FormValues = z.infer<typeof formSchema>;

// Props del componente
interface ImputadoFormProps {
  initialValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => Promise<void>;
  isSubmitting: boolean;
  isEditing: boolean;
}

export default function ImputadoForm({
  initialValues,
  onSubmit,
  isSubmitting,
  isEditing
}: ImputadoFormProps) {
  // Inicializar el formulario
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreSujeto: initialValues?.nombreSujeto || '',
      docId: initialValues?.docId || '',
      nacionalidadId: initialValues?.nacionalidadId || null
    }
  });

  // Verificar si el formulario está "sucio" (modificado)
  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre del Sujeto */}
        <FormField
          control={form.control}
          name="nombreSujeto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Imputado</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ingrese el nombre completo"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Documento de Identidad */}
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
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nacionalidad */}
        <FormField
          control={form.control}
          name="nacionalidadId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nacionalidad</FormLabel>
              <Select
                disabled={isSubmitting}
                onValueChange={field.onChange}
                value={field.value || undefined}
                defaultValue={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una nacionalidad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Chilena</SelectItem>
                  <SelectItem value="2">Argentina</SelectItem>
                  <SelectItem value="3">Peruana</SelectItem>
                  {/* Agregar más nacionalidades según necesites */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          {!isEditing && (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isSubmitting || !isFormDirty}
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || (!isFormDirty && !isEditing)}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isEditing ? 'Actualizando...' : 'Guardando...'}
              </span>
            ) : isEditing ? (
              'Actualizar'
            ) : (
              'Guardar'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
