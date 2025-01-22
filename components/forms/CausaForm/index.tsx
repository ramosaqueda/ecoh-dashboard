import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import FormField from './FormField';
import SwitchField from './SwitchField';
import AnalistaSelect from '@/components/select/AnalistaSelect';
import AbogadoSelect from '@/components/select/AbogadoSelect';
import DelitoSelect from '@/components/select/DelitoSelect';
import TribunalSelect from '@/components/select/TribunalSelect';
import FiscalSelect from '@/components/select/FiscalSelect';
import FocoSelect from '@/components/select/FocoSelect';

import { causaSchema } from '@/schemas/causaSchema';
import type { CausaFormData } from '@/types/causa';
import CrimenOrgParamsSelect from '@/components/select/CrimenOrgParamsSelect';
import CrimenOrgGauge from '@/components/CrimenorgGauge';

interface CausaFormProps {
  initialValues?: Partial<CausaFormData>;
  onSubmit: (data: CausaFormData) => Promise<void>;
  isSubmitting: boolean;
  isEditing?: boolean;
}

const CausaForm: React.FC<CausaFormProps> = ({
  initialValues = {},
  onSubmit,
  isSubmitting,
  isEditing = false
}) => {
  const form = useForm<CausaFormData>({
    resolver: zodResolver(causaSchema),
    defaultValues: {
      // Valores por defecto para campos booleanos
      causaEcoh: false,
      causaLegada: false,
      constituyeSs: false,
      homicidioConsumado: false,
      // Sobrescribir con los valores iniciales si existen
      ...initialValues
    }
  });

  const handleSubmit = async (data: CausaFormData) => {
    try {
      await onSubmit(data);

      if (!isEditing) {
        form.reset();
      }
    } catch (error) {
      console.error('Error en el formulario:', error);
    }
  };

  React.useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      console.log('VALORES INICIALES:', initialValues);
      // Asegurarse de que los IDs sean strings para los selects
      const formattedValues = {
        ...initialValues,
        abogado: initialValues.abogado?.toString(),
        analista: initialValues.analista?.toString(),
        fiscalACargo: initialValues.fiscalACargo?.toString(),
        tribunal: initialValues.tribunal?.toString(),
        delito: initialValues.delito?.toString(),
        foco: initialValues.foco?.toString(),
        // Asegurarse de que las fechas estén en el formato correcto
        fechaHoraTomaConocimiento: initialValues.fechaHoraTomaConocimiento
          ? new Date(initialValues.fechaHoraTomaConocimiento)
            .toISOString()
            .slice(0, 16)
          : '',
        fechaDelHecho: initialValues.fechaDelHecho
          ? new Date(initialValues.fechaDelHecho).toISOString().slice(0, 10)
          : '',
        fechaIta: initialValues.fechaIta
          ? new Date(initialValues.fechaIta).toISOString().slice(0, 10)
          : '',
        fechaPpp: initialValues.fechaPpp
          ? new Date(initialValues.fechaPpp).toISOString().slice(0, 10)
          : ''
      };

      // Actualizar todos los campos con los valores formateados
      Object.entries(formattedValues).forEach(([key, value]) => {
        if (value !== undefined) {
          form.setValue(key as keyof CausaFormData, value);
        }
      });
    } else {
      console.log('No initialValues provided');
    }
  }, [initialValues, form]);
  const selectedDelito = form.watch('delito');
  const isHomicidio = selectedDelito === "1";
  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  return (
    <Card className="mx-auto w-full max-w-[1200px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {isEditing ? 'Editar Causa' : 'Registro de Causa'}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {isEditing
            ? 'Modifique los datos de la causa existente'
            : 'Ingrese los datos de la nueva causa'}
        </p>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            {/* Sección de Switches */}
            <div className="space-y-4 rounded-lg bg-muted/50 p-4">
              <h3 className="mb-4 font-medium">Configuración inicial</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <SwitchField form={form} name="causaEcoh" label="Causa ECOH" />
                <SwitchField
                  form={form}
                  name="causaLegada"
                  label="Causa Legada"
                />
                <SwitchField
                  form={form}
                  name="constituyeSs"
                  label="Constituye SS"
                />

                {isHomicidio && (
                  <SwitchField form={form} name="homicidioConsumado" label="Homicidio Consumado" />
                )}
              </div>
            </div>

            {/* Sección de Datos Principales */}
            <div className="space-y-4">
              <h3 className="font-medium">Datos Principales</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FormField
                  form={form}
                  name="denominacionCausa"
                  label="Denominación Causa"
                  required
                >
                  <Input placeholder="Ingrese denominación" />
                </FormField>

                <FormField
                  form={form}
                  name="fechaHoraTomaConocimiento"
                  label="Fecha y Hora Toma Conocimiento"
                  required
                >
                  <Input type="datetime-local" />
                </FormField>

                <FormField
                  form={form}
                  name="fechaDelHecho"
                  label="Fecha del Hecho"
                  required
                >
                  <Input type="date" />
                </FormField>
              </div>
            </div>

            {/* Sección de Identificación */}
            <div className="space-y-4">
              <h3 className="font-medium">Identificación</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <FormField form={form} name="ruc" label="RUC">
                  <Input placeholder="Ingrese RUC" />
                </FormField>

                <FormField form={form} name="foliobw" label="Folio BW">
                  <Input placeholder="Ingrese folio" />
                </FormField>

                <FormField form={form} name="rit" label="RIT">
                  <Input placeholder="Ingrese RIT" />
                </FormField>
              </div>
            </div>

            {/* Sección de Clasificación */}
            <div className="space-y-4">
              <h3 className="font-medium">Clasificación</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <FormField form={form} name="delito" label="Delito" required>
                  <DelitoSelect
                    value={form.watch('delito')}
                    onValueChange={(value) =>
                      form.setValue('delito', value, {
                        shouldValidate: true,
                        shouldDirty: true
                      })
                    }
                    error={form.formState.errors.delito?.message}
                    required
                  />
                </FormField>

                <FormField form={form} name="foco" label="Foco">
                  <FocoSelect
                    value={form.watch('foco')}
                    onValueChange={(value) =>
                      form.setValue('foco', value, {
                        shouldValidate: true,
                        shouldDirty: true
                      })
                    }
                  />
                </FormField>

                <FormField
                  form={form}
                  name="coordenadasSs"
                  label="Coordenadas SS"
                >
                  <Input placeholder="Ingrese coordenadas" />
                </FormField>
              </div>
            </div>

            {/* Sección de Responsables */}
            <div className="space-y-4">
              <h3 className="font-medium">Responsables</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <FormField
                  form={form}
                  name="fiscalACargo"
                  label="Fiscal a Cargo"
                >
                  <FiscalSelect
                    value={form.watch('fiscalACargo')}
                    onValueChange={(value) =>
                      form.setValue('fiscalACargo', value, {
                        shouldValidate: true,
                        shouldDirty: true
                      })
                    }
                  />
                </FormField>

                <FormField form={form} name="abogado" label="Abogado">
                  <AbogadoSelect
                    value={form.watch('abogado')}
                    onValueChange={(value) =>
                      form.setValue('abogado', value, {
                        shouldValidate: true,
                        shouldDirty: true
                      })
                    }
                  />
                </FormField>

                <FormField form={form} name="analista" label="Analista">
                  <AnalistaSelect
                    value={form.watch('analista')}
                    onValueChange={(value) =>
                      form.setValue('analista', value, {
                        shouldValidate: true,
                        shouldDirty: true
                      })
                    }
                  />
                </FormField>

                <FormField form={form} name="tribunal" label="Tribunal">
                  <TribunalSelect
                    value={form.watch('tribunal')}
                    onValueChange={(value) =>
                      form.setValue('tribunal', value, {
                        shouldValidate: true,
                        shouldDirty: true
                      })
                    }
                    error={form.formState.errors.tribunal?.message}
                  />
                </FormField>
              </div>
            </div>

            {/* Sección de Fechas Adicionales */}
            <div className="space-y-4">
              <h3 className="font-medium">Fechas y Números de Registro</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <FormField form={form} name="fechaIta" label="Fecha ITA">
                  <Input type="date" />
                </FormField>

                <FormField form={form} name="numeroIta" label="N° ITA">
                  <Input placeholder="Ingrese N° ITA" />
                </FormField>

                <FormField form={form} name="fechaPpp" label="Fecha PPP">
                  <Input type="date" />
                </FormField>

                <FormField form={form} name="numeroPpp" label="N° PPP">
                  <Input placeholder="Ingrese N° PPP" />
                </FormField>
              </div>
            </div>

            {/* Sección de Parámetros de Crimen Organizado */}
            <div className="space-y-2">
              <h3 className="font-medium">Parámetros Crimen Organizado</h3>
              <div className="grid grid-cols-3 gap-6">
                {/* Select ocupando 2 columnas */}
                <div className="col-span-2">
                  <FormField
                    form={form}
                    name="co"
                    label="Crimen Organizado"
                  >
                    <CrimenOrgParamsSelect />
                  </FormField>
                </div>

                {/* Checkbox ocupando 1 columna */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms1"
                    className="w-4 h-4 border-2 border-gray-500 rounded-none"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Crimen Organizado
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* Sección de Observaciones */}
            <div className="space-y-4">
              <h3 className="font-medium">Observaciones</h3>
              <FormField form={form} name="observacion" label="Observación">
                <Textarea
                  className="min-h-[100px]"
                  placeholder="Ingrese observaciones adicionales..."
                />
              </FormField>
            </div>



            <Separator />

            {/* Botones de Acción */}
            <div className="sticky bottom-0 flex justify-end space-x-4 bg-white py-4">
              {!isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isSubmitting || !isFormDirty}
                >
                  Limpiar
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSubmitting || (!isFormDirty && !isEditing)}
                className="min-w-[150px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isEditing ? 'Actualizando...' : 'Guardando...'}
                  </span>
                ) : isEditing ? (
                  'Actualizar Causa'
                ) : (
                  'Guardar Causa'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card >
  );
};

export default CausaForm;