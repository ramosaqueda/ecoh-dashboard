import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

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

interface CausaFormProps {
  initialValues?: Partial<CausaFormData>;
  onSubmit: (data: CausaFormData) => Promise<void>;
  isSubmitting: boolean;
}

const CausaForm: React.FC<CausaFormProps> = ({
  initialValues = {},
  onSubmit,
  isSubmitting
}) => {
  const form = useForm<CausaFormData>({
    resolver: zodResolver(causaSchema),
    defaultValues: initialValues
  });

  const handleSubmit = async (data: CausaFormData) => {
    try {
      console.log('Datos originales:', data);

      const transformedData = {
        // Campos booleanos
        causaEcoh: data.causaEcoh,
        causaLegada: data.causaLegada,
        constituyeSs: data.constituyeSs,

        // Campos de texto
        denominacionCausa: data.denominacionCausa,
        ruc: data.ruc,
        foliobw: data.foliobw,
        coordenadasSs: data.coordenadasSs,
        rit: data.rit,
        numeroIta: data.numeroIta,
        numeroPpp: data.numeroPpp,
        observacion: data.observacion,

        // Fechas
        fechaHoraTomaConocimiento: new Date(
          data.fechaHoraTomaConocimiento
        ).toISOString(),
        fechaDelHecho: new Date(
          `${data.fechaDelHecho}T00:00:00.000Z`
        ).toISOString(),
        fechaIta: data.fechaIta
          ? new Date(`${data.fechaIta}T00:00:00.000Z`).toISOString()
          : null,
        fechaPpp: data.fechaPpp
          ? new Date(`${data.fechaPpp}T00:00:00.000Z`).toISOString()
          : null,

        // Relaciones
        delitoId: parseInt(data.delito.toString()),
        focoId: data.foco ? parseInt(data.foco.toString()) : null,
        tribunalId: data.tribunal ? parseInt(data.tribunal.toString()) : null,
        fiscalId: data.fiscalACargo
          ? parseInt(data.fiscalACargo.toString())
          : null,
        abogadoId: data.abogado ? parseInt(data.abogado.toString()) : null,
        analistaId: data.analista ? parseInt(data.analista.toString()) : null
      };

      console.log('Datos transformados:', transformedData);

      await onSubmit(transformedData);
      toast.success('Causa guardada exitosamente');
      form.reset();
    } catch (error) {
      console.error('Error detallado:', error);
      toast.error(
        'Error al guardar la causa: ' +
          (error instanceof Error ? error.message : 'Error desconocido')
      );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-[1200px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Registro de Causa</CardTitle>
        <p className="text-sm text-muted-foreground">
          Ingrese los datos de la nueva causa
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isSubmitting}
              >
                Limpiar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[150px]"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Causa'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CausaForm;
