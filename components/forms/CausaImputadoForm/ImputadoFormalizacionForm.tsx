//ImputadoFormalizacionForm.tsx
import { useForm} from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import {Loader2, SquarePen } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as z from 'zod';
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { useEffect, useState, useMemo } from 'react';
import { CausaImputado } from "@/types/causaimputado";
import { Causa, CausasImputados, Imputado } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CausaForm from "../CausaForm";

interface Cautelar {
  id: number;
  nombre: string;
}

interface FormalizacionFormProps {
  causaId: string;
  imputadoId: string;
  onSuccess?: () =>void;
}

const FormalizacionSchema = z
  .object({
    causaId: z.string(),
    imputadoId: z.string(),
    formalizado: z.boolean().default(false),
    fechaFormalizacion: z.date().nullable().optional(),
    cautelarId: z.string().optional().nullable(),
    plazo: z.number().nullable().default(0)
  });

export type FormalizacionFormValues = z.infer<typeof FormalizacionSchema>;


const ImputadoFormalizacionForm :React.FC<FormalizacionFormProps>= ({
  causaId,
  imputadoId,
  onSuccess
}:FormalizacionFormProps) => {
  const form = useForm<FormalizacionFormValues>({
    resolver: zodResolver(FormalizacionSchema),
      defaultValues: {
        formalizado: false,
        fechaFormalizacion: null,
        cautelarId: '',
        plazo: 0
      },
  });

  const { control, setValue,handleSubmit, watch, formState: { isSubmitting } } = form;
  const [cautelares, setCautelares] = useState<Cautelar[]>([]);
  const [isLoadingCautelares, setIsLoadingCautelares] = useState(true);
  const [isLoadingCausaImputado, setIsLoadingCausaImputado] = useState(true);
  const [cautelar, setCautelar] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingCautelares(true);
      setIsLoadingCausaImputado(true);
      
      try {
        const [cautelaresResponse, causaimputadoResponse] = await Promise.all([
          fetch('/api/cautelar'),
          fetch('/api/causas-imputados?causaId=' + causaId)
        ]);
  
        if (!cautelaresResponse.ok || !causaimputadoResponse.ok) {
          throw new Error(`Error al cargar los datos: ${cautelaresResponse.statusText}, ${causaimputadoResponse.statusText}`);
        }
        
  
        const cautelaresData = await cautelaresResponse.json();
        const causaImputadoDataArray = await causaimputadoResponse.json();
        
        const causaImputadoId = `${causaId}-${imputadoId}`;
        
        const formalizacionIndex = causaImputadoDataArray.findIndex((causaImputado: { id: string; }) => causaImputado.id === causaImputadoId);
        if (formalizacionIndex !== -1) {
          const causaImputadoData = causaImputadoDataArray[formalizacionIndex];
        setCautelares(cautelaresData);
        const cautelarId = causaImputadoData.cautelarId;

        const cautelarIndex = cautelaresData.findIndex((cautelar: {id: number}) => cautelar.id === parseInt(cautelarId));
        
        setValue('formalizado', causaImputadoData.formalizado || false);
        
        setValue('fechaFormalizacion', causaImputadoData.fechaFormalizacion ? new Date(causaImputadoData.fechaFormalizacion) : null);
        setValue('plazo', causaImputadoData.plazo || 0);
        console.log(cautelaresData[cautelarIndex].nombre);
        console.log(cautelarIndex);

        if (cautelarIndex !== -1) {
          const cautelarId = cautelaresData[cautelarIndex].id.toString();
          setValue('cautelarId', cautelarId);
          setCautelar(cautelarId);
        } else {
          setValue('cautelarId', "");
          setCautelar("");
        }
        
        }
 
      } catch (error) {
        console.error('Error:', error);
        setCautelares([]);
      } finally {
        setIsLoadingCautelares(false);
        setIsLoadingCausaImputado(false);
      }
    };
  
    fetchData();
  }, [imputadoId, setValue]);

  const watchFormalizado = form.watch('formalizado');

  const onSubmit = async (data: FormalizacionFormValues) => {
    console.log('holi');
    try {
      const formData = {
        causaId: data.causaId,
        imputadoId: data.imputadoId,
        formalizado: data.formalizado || false,
        fechaFormalizacion: data.formalizado ? data.fechaFormalizacion : null,
        cautelarId: data.cautelarId || null,
        plazo: data.plazo || 0
      };
      
      const response = await fetch(
        '/api/causas-imputados' + `/${imputadoId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(
          responseData.error ||
            'Error al actualizar los datos del imputado'
        );
      }

      toast({
        title: 'Éxito',
        description: 'Datos del imputado en la causa actualizados exitosamente'
      });

    } catch (error:any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message
      });
    }
  };
  const handleCautelarChange = (value: any) => {
    setCautelar(value);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <SquarePen />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Datos</DialogTitle>
            <DialogDescription>Datos del imputado en una causa</DialogDescription>
            <Form {...form}>
              {isLoadingCautelares || isLoadingCausaImputado ? (
                <Loader2>Cargando datos...</Loader2>
              ) : (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="formalizado"
                    render={({ field }) => (
                      <FormItem>
                        <Switch id="formalizado" checked={field.value} onCheckedChange={field.onChange} />
                        <FormLabel htmlFor="formalizado">Formalizado</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cautelarId"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCautelarChange(value);
                      }}
                      value={field.value ?? undefined}
                      disabled={isLoadingCautelares}
                      >
                        <FormLabel htmlFor="cautelarId">Medida Cautelar</FormLabel>
                          <FormControl>
                            <SelectTrigger id="cautelarId" className="w-full">
                              <SelectValue placeholder="Seleccione una medida cautelar">
                                {field.value
                                  ? cautelares.find((c) => c.id.toString() === field.value)?.nombre
                                  : 'Seleccione una medida cautelar'}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cautelares.map((cautelar) => (
                              <SelectItem key={cautelar.id} value={cautelar.id.toString()}>
                                {cautelar.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {watchFormalizado && (
                    <>
                      <FormField
                        control={form.control}
                        name="fechaFormalizacion"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel htmlFor="fechaFormalizacion">Fecha Formalización</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger id="fechaFormalizacion" asChild >
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Seleccione una fecha</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value ?? undefined}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="plazo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="plazo">Plazo de Investigación</FormLabel>
                            <FormControl>
                              <Input
                              id="plazo"
                              type="number"
                              min="0"
                              {...field}
                              onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              value={field.value || ''}
                              placeholder="Ingrese el plazo en días"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                   <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {'Actualizando...'}
                    </>
                  ) : (
                    'Actualizar'
                  )}
                </Button>
                </div>
              )}
            </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default ImputadoFormalizacionForm;
