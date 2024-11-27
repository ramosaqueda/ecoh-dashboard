// components/forms/telefono-form.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { TelefonoCausaManager } from '@/components/forms/Telefonos/TelefonoCausaManager';

const formSchema = z.object({
  numeroTelefonico: z.number().min(100000000, 'Número inválido'),
  idProveedorServicio: z.string().min(1, 'Seleccione un proveedor'),
  imei: z.string().min(1, 'IMEI es requerido'),
  abonado: z.string().min(1, 'Abonado es requerido'),
  solicitaTrafico: z.boolean(),
  solicitaImei: z.boolean(),
  observacion: z.string().optional()
});

type TelefonoFormProps = {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
};

export function TelefonoForm({
  initialData,
  onSubmit,
  onCancel
}: TelefonoFormProps) {
  const [proveedores, setProveedores] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      numeroTelefonico: 0,
      idProveedorServicio: '',
      imei: '',
      abonado: '',
      solicitaTrafico: false,
      solicitaImei: false,
      observacion: ''
    }
  });

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch('/api/proveedores');
        if (!response.ok) throw new Error('Error al cargar proveedores');
        const data = await response.json();
        setProveedores(data);
      } catch (error) {
        toast.error('Error al cargar los proveedores');
      }
    };

    fetchProveedores();
  }, []);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      onSubmit(values);
    } catch (error) {
      toast.error('Error al guardar el teléfono');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="numeroTelefonico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número Telefónico</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idProveedorServicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proveedor de Servicio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un proveedor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {proveedores.map((proveedor) => (
                    <SelectItem
                      key={proveedor.id}
                      value={proveedor.id.toString()}
                    >
                      {proveedor.nombre}
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
          name="imei"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IMEI</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="abonado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abonado</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="solicitaTrafico"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Solicita Tráfico</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="solicitaImei"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Solicita IMEI</FormLabel>
              </FormItem>
            )}
          />
        </div>

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

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {initialData ? 'Actualizar' : 'Crear'} Teléfono
          </Button>
        </div>
      </form>
    </Form>
  );
}
