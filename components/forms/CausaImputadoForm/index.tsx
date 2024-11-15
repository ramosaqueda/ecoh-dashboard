// components/forms/CausaImputadoForm/index.tsx
'use client';

import React, { useEffect, useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Causa {
  id: string;
  ruc: string;
}

interface CausaImputadoFormProps {
  imputadoId: string;
  onSubmit: (data: CausaImputadoFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const CausaImputadoSchema = z.object({
  causaId: z.string().min(1, 'Debe seleccionar una causa'),
  principalImputado: z.boolean().default(false),
  formalizado: z.boolean().default(false),
  fechaFormalizacion: z.date().nullable(),
  cautelarId: z.string().optional()
});

export type CausaImputadoFormValues = z.infer<typeof CausaImputadoSchema>;

export default function CausaImputadoForm({
  imputadoId,
  onSubmit,
  isSubmitting
}: CausaImputadoFormProps) {
  const [causas, setCausas] = useState<Causa[]>([]);
  const [isLoadingCausas, setIsLoadingCausas] = useState(false);

  const form = useForm<CausaImputadoFormValues>({
    resolver: zodResolver(CausaImputadoSchema),
    defaultValues: {
      causaId: '',
      principalImputado: false,
      formalizado: false,
      fechaFormalizacion: null,
      cautelarId: undefined
    }
  });

  useEffect(() => {
    const fetchCausas = async () => {
      setIsLoadingCausas(true);
      try {
        const response = await fetch('/api/causas');
        if (!response.ok) {
          throw new Error('Error al cargar las causas');
        }
        const data = await response.json();
        setCausas(data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar las causas');
      } finally {
        setIsLoadingCausas(false);
      }
    };

    fetchCausas();
  }, []);

  const watchFormalizado = form.watch('formalizado');

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
                        disabled={isLoadingCausas}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione un RUC" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {causas.map((causa) => (
                            <SelectItem
                              key={causa.id}
                              value={causa.id}
                              className="cursor-pointer"
                            >
                              {causa.ruc}
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
                  name="principalImputado"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Imputado Principal
                      </FormLabel>
                    </FormItem>
                  )}
                />

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
                  <FormField
                    control={form.control}
                    name="fechaFormalizacion"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha de Formalización</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Seleccione una fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
 