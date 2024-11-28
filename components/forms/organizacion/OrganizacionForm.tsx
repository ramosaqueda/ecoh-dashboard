'use client';

import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, Loader2, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const organizacionSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  descripcion: z.string().optional(),
  fechaIdentificacion: z.date({
    required_error: 'La fecha de identificación es requerida'
  }),
  activa: z.boolean().default(true),
  tipoOrganizacionId: z.string().min(1, 'El tipo de organización es requerido'),
  miembros: z
    .array(
      z.object({
        imputadoId: z.string().min(1, 'El imputado es requerido'),
        rol: z.string().optional(),
        orden: z.number().int().min(0).default(0),
        fechaIngreso: z.date(),
        fechaSalida: z.date().optional().nullable()
      })
    )
    .optional()
});

type OrganizacionFormValues = z.infer<typeof organizacionSchema>;

interface OrganizacionFormProps {
  initialData?: any;
  onSubmit: (data: OrganizacionFormValues) => Promise<void>;
}

export default function OrganizacionForm({
  initialData,
  onSubmit
}: OrganizacionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMiembros, setSelectedMiembros] = useState<any[]>(
    initialData?.miembros || []
  );
  const [currentTab, setCurrentTab] = useState('general');

  const { data: tiposOrganizacion = [] } = useQuery({
    queryKey: ['tipos-organizacion'],
    queryFn: async () => {
      const res = await fetch('/api/tipo-organizacion');
      return res.json();
    }
  });

  const { data: imputados = [] } = useQuery({
    queryKey: ['imputados'],
    queryFn: async () => {
      const res = await fetch('/api/imputados');
      return res.json();
    }
  });

  const form = useForm<OrganizacionFormValues>({
    resolver: zodResolver(organizacionSchema),
    defaultValues: {
      nombre: initialData?.nombre || '',
      descripcion: initialData?.descripcion || '',
      fechaIdentificacion: initialData?.fechaIdentificacion
        ? new Date(initialData.fechaIdentificacion)
        : new Date(),
      activa: initialData?.activa ?? true,
      tipoOrganizacionId: initialData?.tipoOrganizacionId?.toString() || '',
      miembros: selectedMiembros
    }
  });

  const handleSubmit = async (data: OrganizacionFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit({ ...data, miembros: selectedMiembros });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addMiembro = () => {
    setSelectedMiembros([
      ...selectedMiembros,
      {
        imputadoId: '',
        rol: '',
        orden: selectedMiembros.length,
        fechaIngreso: new Date(),
        fechaSalida: null
      }
    ]);
  };

  const removeMiembro = (index: number) => {
    const newMiembros = selectedMiembros.filter((_, i) => i !== index);
    setSelectedMiembros(newMiembros);
  };

  const updateMiembro = (index: number, field: string, value: any) => {
    const newMiembros = [...selectedMiembros];
    newMiembros[index] = {
      ...newMiembros[index],
      [field]: value
    };
    setSelectedMiembros(newMiembros);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Tabs
          defaultValue="general"
          className="w-full"
          value={currentTab}
          onValueChange={setCurrentTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="miembros" className="relative">
              Miembros
              {selectedMiembros.length > 0 && (
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {selectedMiembros.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardContent className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fechaIdentificacion"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de Identificación</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
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
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipoOrganizacionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Organización</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tiposOrganizacion.map((tipo: any) => (
                            <SelectItem
                              key={tipo.id}
                              value={tipo.id.toString()}
                            >
                              {tipo.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="miembros">
            <Card>
              <CardContent className="pt-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Lista de Miembros</h3>
                  <Button onClick={addMiembro} type="button">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Miembro
                  </Button>
                </div>

                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Imputado</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Orden</TableHead>
                        <TableHead>Fecha Ingreso</TableHead>
                        <TableHead>Fecha Salida</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedMiembros.map((miembro, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Select
                              value={miembro.imputadoId.toString()}
                              onValueChange={(value) =>
                                updateMiembro(index, 'imputadoId', value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione un imputado" />
                              </SelectTrigger>
                              <SelectContent>
                                {imputados.map((imp: any) => (
                                  <SelectItem
                                    key={imp.id}
                                    value={imp.id.toString()}
                                  >
                                    {imp.nombreSujeto}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="Rol"
                              value={miembro.rol}
                              onChange={(e) =>
                                updateMiembro(index, 'rol', e.target.value)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              placeholder="Orden"
                              value={miembro.orden}
                              onChange={(e) =>
                                updateMiembro(
                                  index,
                                  'orden',
                                  parseInt(e.target.value)
                                )
                              }
                              min="0"
                              className="w-20"
                            />
                          </TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    'w-[180px] justify-start text-left font-normal',
                                    !miembro.fechaIngreso &&
                                      'text-muted-foreground'
                                  )}
                                >
                                  {miembro.fechaIngreso ? (
                                    format(new Date(miembro.fechaIngreso), 'PP')
                                  ) : (
                                    <span>Seleccione fecha</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={new Date(miembro.fechaIngreso)}
                                  onSelect={(date) =>
                                    updateMiembro(index, 'fechaIngreso', date)
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    'w-[180px] justify-start text-left font-normal',
                                    !miembro.fechaSalida &&
                                      'text-muted-foreground'
                                  )}
                                >
                                  {miembro.fechaSalida ? (
                                    format(new Date(miembro.fechaSalida), 'PP')
                                  ) : (
                                    <span>Sin fecha de salida</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={
                                    miembro.fechaSalida
                                      ? new Date(miembro.fechaSalida)
                                      : undefined
                                  }
                                  onSelect={(date) =>
                                    updateMiembro(index, 'fechaSalida', date)
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMiembro(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {selectedMiembros.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No hay miembros agregados
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6">
          <Button disabled={isSubmitting} type="submit">
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
