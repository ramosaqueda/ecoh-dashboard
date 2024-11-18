'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Causa {
  id: number;
  ruc: string;
}

interface Cautelar {
  id: number;
  nombre: string;
}

interface CausaImputadoFormProps {
  imputadoId: string;
  onSubmit: (data: CausaImputadoFormValues) => Promise<void>;
  isSubmitting: boolean;
  isEdit?: boolean;
  initialData?: any;
}

const CausaImputadoSchema = z
  .object({
    causaId: z.string().min(1, 'Debe seleccionar una causa'),
    esImputado: z.boolean().default(false),
    essujetoInteres: z.boolean().default(false),
    formalizado: z.boolean().default(false),
    fechaFormalizacion: z.date().nullable().optional(),
    cautelarId: z.string().optional().nullable()
  })
  .refine(
    (data) => {
      // Al menos uno debe ser verdadero
      return data.esImputado || data.essujetoInteres;
    },
    {
      message:
        'Debe seleccionar al menos una calidad (Imputado o Sujeto de Interés)',
      path: ['esImputado'] // Este campo mostrará el error
    }
  );

export type CausaImputadoFormValues = z.infer<typeof CausaImputadoSchema>;

export default function CausaImputadoForm({
  imputadoId,
  onSubmit,
  isSubmitting,
  isEdit = false,
  initialData
}: CausaImputadoFormProps) {
  const [causas, setCausas] = useState<Causa[]>([]);
  const [cautelares, setCautelares] = useState<Cautelar[]>([]);
  const [isLoadingCausas, setIsLoadingCausas] = useState(false);
  const [isLoadingCautelares, setIsLoadingCautelares] = useState(false);

  const form = useForm<CausaImputadoFormValues>({
    resolver: zodResolver(CausaImputadoSchema),
    defaultValues: {
      causaId: initialData ? initialData.causaId.toString() : '',
      esImputado: initialData?.esImputado || false,
      essujetoInteres: initialData?.essujetoInteres || false,
      formalizado: initialData?.formalizado || false,
      fechaFormalizacion: initialData?.fechaFormalizacion
        ? new Date(initialData.fechaFormalizacion)
        : null,
      cautelarId: initialData?.cautelarId
        ? initialData.cautelarId.toString()
        : undefined
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingCausas(true);
      setIsLoadingCautelares(true);
      try {
        const [causasResponse, cautelaresResponse] = await Promise.all([
          fetch('/api/causas'),
          fetch('/api/cautelar')
        ]);

        if (!causasResponse.ok || !cautelaresResponse.ok) {
          throw new Error('Error al cargar los datos');
        }

        const causasData = await causasResponse.json();
        const cautelaresData = await cautelaresResponse.json();

        setCausas(causasData);
        setCautelares(cautelaresData);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar los datos');
      } finally {
        setIsLoadingCausas(false);
        setIsLoadingCautelares(false);
      }
    };

    fetchData();
  }, []);

  const watchFormalizado = form.watch('formalizado');
  const watchEsImputado = form.watch('esImputado');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Información de la Causa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="causaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUC</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoadingCausas || isEdit}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un RUC">
                          {field.value
                            ? causas.find(
                                (c) => c.id.toString() === field.value
                              )?.ruc
                            : 'Seleccione un RUC'}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {causas.map((causa) => (
                        <SelectItem key={causa.id} value={causa.id.toString()}>
                          {causa.ruc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 border-t pt-4">
              <FormField
                control={form.control}
                name="esImputado"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Es Imputado</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="essujetoInteres"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Es Sujeto de Interés
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {watchEsImputado && (
              <div className="space-y-4 border-t pt-4">
                <FormField
                  control={form.control}
                  name="formalizado"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Formalizado</FormLabel>
                    </FormItem>
                  )}
                />

                {watchFormalizado && (
                  <>
                    <FormField
                      control={form.control}
                      name="fechaFormalizacion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de Formalización</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              value={
                                field.value
                                  ? format(field.value, 'yyyy-MM-dd')
                                  : ''
                              }
                              onChange={(e) => {
                                const date = e.target.valueAsDate;
                                field.onChange(date);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cautelarId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medida Cautelar</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={isLoadingCautelares}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccione una medida cautelar">
                                  {field.value
                                    ? cautelares.find(
                                        (c) => c.id.toString() === field.value
                                      )?.nombre
                                    : 'Seleccione una medida cautelar'}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cautelares.map((cautelar) => (
                                <SelectItem
                                  key={cautelar.id}
                                  value={cautelar.id.toString()}
                                >
                                  {cautelar.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="plazo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plazo (días)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                              }
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormDescription>
                            Ingrese el plazo en días
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={isSubmitting || !form.watch('causaId')}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEdit ? 'Actualizando...' : 'Guardando...'}
              </>
            ) : isEdit ? (
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
