'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import CausaSelector from '@/components/select/CausaSelector';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const ActividadSchema = z
  .object({
    causaId: z.string().min(1, 'Debe seleccionar una causa'),
    tipoActividadId: z.string().min(1, 'Debe seleccionar un tipo de actividad'),
    fechaInicio: z.string().min(1, 'Debe seleccionar una fecha de inicio'),
    fechaTermino: z.string().min(1, 'Debe seleccionar una fecha de término'),
    observacion: z.string().optional(),
    estado: z.enum(['inicio', 'en_proceso', 'terminado'])
  })
  .refine((data) => data.fechaTermino >= data.fechaInicio, {
    message: 'La fecha de término debe ser posterior a la fecha de inicio',
    path: ['fechaTermino']
  });

interface TipoActividad {
  id: number;
  nombre: string;
  activo: boolean;
}

export type ActividadFormValues = z.infer<typeof ActividadSchema>;

interface ActividadFormProps {
  onSubmit: (data: ActividadFormValues) => Promise<void>;
  isSubmitting: boolean;
  initialData?: {
    id?: number;
    causaId: string;
    tipoActividadId: string;
    fechaInicio: string;
    fechaTermino: string;
    estado: 'inicio' | 'en_proceso' | 'terminado';
    observacion?: string;
  } | null;
}

export default function ActividadForm({
  onSubmit,
  isSubmitting,
  initialData
}: ActividadFormProps) {
  const [tiposActividad, setTiposActividad] = useState<TipoActividad[]>([]);
  const [isLoadingTipos, setIsLoadingTipos] = useState(true);

  const form = useForm<ActividadFormValues>({
    resolver: zodResolver(ActividadSchema),
    defaultValues: initialData || {
      causaId: '',
      tipoActividadId: '',
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaTermino: new Date().toISOString().split('T')[0],
      estado: 'inicio',
      observacion: ''
    }
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [form, initialData]);

  useEffect(() => {
    const fetchTiposActividad = async () => {
      try {
        const response = await fetch('/api/tipos-actividad');
        if (!response.ok) throw new Error('Error al cargar tipos de actividad');

        const data = await response.json();
        setTiposActividad(data.filter((tipo: TipoActividad) => tipo.activo));
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar los tipos de actividad');
      } finally {
        setIsLoadingTipos(false);
      }
    };

    fetchTiposActividad();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {initialData ? 'Editar Actividad' : 'Nueva Actividad'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="causaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Causa</FormLabel>
                  <CausaSelector
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.causaId?.message}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipoActividadId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Actividad</FormLabel>
                  <Select
                    disabled={isLoadingTipos}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tiposActividad.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id.toString()}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fechaInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Inicio</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fechaTermino"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Término</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        min={form.watch('fechaInicio')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="inicio">Inicio</SelectItem>
                      <SelectItem value="en_proceso">En Proceso</SelectItem>
                      <SelectItem value="terminado">Terminado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observación</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
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
  );
}