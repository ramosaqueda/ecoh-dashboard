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

const formSchema = z.object({
  numeroTelefonico: z.string()
    .min(9, 'El número debe tener al menos 9 dígitos')
    .max(12, 'El número no debe exceder 12 dígitos')
    .regex(/^\+?[0-9]+$/, 'El número solo puede contener dígitos y opcionalmente el símbolo +'),
  idProveedorServicio: z.string().min(1, 'Seleccione un proveedor'),
  imei: z.string().min(1, 'IMEI es requerido'),
  abonado: z.string().min(1, 'Abonado es requerido'),
  solicitaTrafico: z.boolean().nullable(),
  solicitaImei: z.boolean().nullable(),
  extraccionForense: z.boolean().nullable(),
  observacion: z.string().optional()
});

export function TelefonoForm({
  initialData,
  onSubmit,
  onCancel
}) {
  const [proveedores, setProveedores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Preparación de valores iniciales
  const initialValues = {
    ...initialData,
    numeroTelefonico: initialData?.numeroTelefonico 
      ? initialData.numeroTelefonico.toString() 
      : '',
    idProveedorServicio: initialData?.idProveedorServicio 
      ? initialData.idProveedorServicio.toString()
      : '',
    solicitaTrafico: initialData?.solicitaTrafico ?? null,
    solicitaImei: initialData?.solicitaImei ?? null,
    extraccionForense: initialData?.extraccionForense ?? null,
    imei: initialData?.imei || '',
    abonado: initialData?.abonado || '',
    observacion: initialData?.observacion || ''
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  });

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/proveedores');
        if (!response.ok) throw new Error('Error al cargar proveedores');
        const data = await response.json();
        setProveedores(data);
      } catch (error) {
        toast.error('Error al cargar los proveedores');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProveedores();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        numeroTelefonico: values.numeroTelefonico.replace(/\D/g, '') // Elimina todo excepto dígitos
      };
      await onSubmit(formattedValues);
    } catch (error) {
      toast.error('Error al guardar el teléfono');
      console.error('Error:', error);
    }
  };

  // Función auxiliar para manejar los cambios en los checkboxes
  const handleCheckboxChange = (field, value) => {
    field.onChange(value === field.value ? null : value);
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
                  type="tel"
                  placeholder="+56912345678"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\+?\d*$/.test(value)) {
                      field.onChange(value);
                    }
                  }}
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
              <Select 
                value={field.value} 
                onValueChange={field.onChange}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un proveedor">
                      {proveedores.find(p => p.id.toString() === field.value)?.nombre}
                    </SelectValue>
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
                <Input 
                  {...field} 
                  placeholder="Ingrese el IMEI del dispositivo"
                />
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
                <Input 
                  {...field} 
                  placeholder="Ingrese el nombre del abonado"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="solicitaTrafico"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={(checked) => handleCheckboxChange(field, checked)}
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Solicita Tráfico
                </FormLabel>
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
                    checked={field.value ?? false}
                    onCheckedChange={(checked) => handleCheckboxChange(field, checked)}
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Solicita IMEI
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="extraccionForense"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={(checked) => handleCheckboxChange(field, checked)}
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Extracción Forense
                </FormLabel>
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
                <Textarea 
                  {...field} 
                  placeholder="Ingrese cualquier observación adicional"
                  className="min-h-[100px]"
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
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
          >
            {initialData ? 'Actualizar' : 'Crear'} Teléfono
          </Button>
        </div>
      </form>
    </Form>
  );
}