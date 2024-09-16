import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import AnalistaSelect from '@/components/select/AnalistaSelect';
import AbogadoSelect from '@/components/select/AbogadoSelect';
import DelitoSelect from '@/components/select/DelitoSelect';
import TribunalSelect from '@/components/select/TribunalSelect';
import FiscalSelect from '@/components/select/FiscalSelect';
import FocoSelect from '@/components/select/FocoSelect';
import NacionalidadSelect from '@/components/select/NacionalidadSelect';
interface CausaFormProps {
  initialValues?: any;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const CausaForm: React.FC<CausaFormProps> = ({
  initialValues = {},
  onSubmit,
  isSubmitting
}) => {
  const [formData, setFormData] = React.useState(initialValues);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="mx-auto w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Formulario de Causa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label
                htmlFor="causaEcoh"
                className="flex items-center space-x-2"
              >
                <Switch
                  id="causaEcoh"
                  checked={formData.causaEcoh || false}
                  onCheckedChange={(checked) =>
                    handleChange('causaEcoh', checked)
                  }
                />
                <span>Causa ECOH</span>
              </Label>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="causeLegada"
                className="flex items-center space-x-2"
              >
                <Switch
                  id="causeLegada"
                  checked={formData.causeLegada || false}
                  onCheckedChange={(checked) =>
                    handleChange('causeLegada', checked)
                  }
                />
                <span>Causa Legada</span>
              </Label>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="constituyeSs"
                className="flex items-center space-x-2"
              >
                <Switch
                  id="constituyeSs"
                  checked={formData.constituyeSs || false}
                  onCheckedChange={(checked) =>
                    handleChange('constituyeSs', checked)
                  }
                />
                <span>Constituye SS</span>
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaHoraTomaConocimiento">
                Fecha y Hora Toma Conocimiento
              </Label>
              <Input
                id="fechaHoraTomaConocimiento"
                type="datetime-local"
                value={formData.fechaHoraTomaConocimiento || ''}
                onChange={(e) =>
                  handleChange('fechaHoraTomaConocimiento', e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ruc">RUC</Label>
              <Input
                id="ruc"
                placeholder="RUC"
                value={formData.ruc || ''}
                onChange={(e) => handleChange('ruc', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="folioBw">Folio BW</Label>
              <Input
                id="folioBw"
                placeholder="Folio BW"
                value={formData.folioBw || ''}
                onChange={(e) => handleChange('folioBw', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaDelHecho">Fecha del Hecho</Label>
              <Input
                id="fechaDelHecho"
                type="date"
                value={formData.fechaDelHecho || ''}
                onChange={(e) => handleChange('fechaDelHecho', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coordenadasSs">Coordenadas SS</Label>
              <Input
                id="coordenadasSs"
                placeholder="Coordenadas SS"
                value={formData.coordenadasSs || ''}
                onChange={(e) => handleChange('coordenadasSs', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delito">Delito</Label>
              <DelitoSelect
                selectedId={formData.delito}
                onValueChange={(value) =>
                  handleChange('delito', parseInt(value))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foco">Foco</Label>
              <FocoSelect
                selectedId={formData.foco}
                onValueChange={(value) => handleChange('foco', parseInt(value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rit">RIT</Label>
              <Input
                id="rit"
                placeholder="RIT"
                value={formData.rit || ''}
                onChange={(e) => handleChange('rit', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tribunal">Tribunal</Label>
              <TribunalSelect
                selectedId={formData.tribunal}
                onValueChange={(value) =>
                  handleChange('tribunal', parseInt(value))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="denominacionCausa">Denominación Causa</Label>
              <Input
                id="denominacionCausa"
                placeholder="Denominación Causa"
                value={formData.denominacionCausa || ''}
                onChange={(e) =>
                  handleChange('denominacionCausa', e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fiscalACargo">Fiscal a Cargo</Label>
              <FiscalSelect
                selectedId={formData.fiscalACargo}
                onValueChange={(value) =>
                  handleChange('fiscalACargo', parseInt(value))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="abogado">Abogado</Label>
              <AbogadoSelect
                selectedId={formData.abogado}
                onValueChange={(value) =>
                  handleChange('abogado', parseInt(value))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="analista">Analista</Label>

              <AnalistaSelect
                selectedId={formData.analista}
                onValueChange={(value) =>
                  handleChange('analista', parseInt(value))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaIta">Fecha ITA</Label>
              <Input
                id="fechaIta"
                type="date"
                value={formData.fechaIta || ''}
                onChange={(e) => handleChange('fechaIta', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroIta">N° ITA</Label>
              <Input
                id="numeroIta"
                placeholder="N° ITA"
                value={formData.numeroIta || ''}
                onChange={(e) => handleChange('numeroIta', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaPpp">Fecha PPP</Label>
              <Input
                id="fechaPpp"
                type="date"
                value={formData.fechaPpp || ''}
                onChange={(e) => handleChange('fechaPpp', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroPpp">N° PPP</Label>
              <Input
                id="numeroPpp"
                placeholder="N° PPP"
                value={formData.numeroPpp || ''}
                onChange={(e) => handleChange('numeroPpp', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="victima">Víctima</Label>
              <Input
                id="victima"
                placeholder="Víctima"
                value={formData.victima || ''}
                onChange={(e) => handleChange('victima', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rut">RUT</Label>
              <Input
                id="rut"
                placeholder="RUT"
                value={formData.rut || ''}
                onChange={(e) => handleChange('rut', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nacionalidadVictima">
                Nacionalidad (Víctima)
              </Label>
              <NacionalidadSelect
                selectedId={formData.nacionalidadVictima}
                onValueChange={(value) =>
                  handleChange('nacionalidadVictima', parseInt(value))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacion">Observación</Label>
            <Textarea
              id="observacion"
              placeholder="Observación"
              value={formData.observacion || ''}
              onChange={(e) => handleChange('observacion', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CausaForm;
