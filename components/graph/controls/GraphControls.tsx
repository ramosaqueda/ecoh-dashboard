// components/graph/controls/GraphControls.tsx
'use client';

import { Search, Sliders } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

interface TipoOrganizacion {
  id: number;
  nombre: string;
}

interface GraphControlsProps {
  // Propiedades existentes
  onSearch: (value: string) => void;
  tipoOrganizacion: string;
  onTipoChange: (value: string) => void;
  showActiveOnly: boolean;
  onActiveChange: (value: boolean) => void;
  tipos: TipoOrganizacion[];
  className?: string;
  // Nuevas propiedades para visualización
  linkDistance: number;
  onLinkDistanceChange: (value: number) => void;
  dagMode: string;
  onDagModeChange: (value: string) => void;
  nodeSize: number;
  onNodeSizeChange: (value: number) => void;
}

export const GraphControls = ({
  onSearch,
  tipoOrganizacion,
  onTipoChange,
  showActiveOnly,
  onActiveChange,
  tipos,
  className,
  linkDistance,
  onLinkDistanceChange,
  dagMode,
  onDagModeChange,
  nodeSize,
  onNodeSizeChange
}: GraphControlsProps) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    onSearch(searchTerm);
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex flex-wrap items-center gap-4">
        <form 
          onSubmit={handleSearch} 
          className="flex-1 min-w-[200px] lg:max-w-sm flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="search"
              placeholder="Buscar organización o imputado..."
              className="pl-8"
            />
          </div>
          <Button type="submit" variant="secondary">
            Buscar
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <Select value={tipoOrganizacion} onValueChange={onTipoChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tipo de organización" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {tipos.map((tipo) => (
                  <SelectItem key={tipo.id} value={tipo.id.toString()}>
                    {tipo.nombre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <Switch
              id="active-filter"
              checked={showActiveOnly}
              onCheckedChange={onActiveChange}
            />
            <Label htmlFor="active-filter">Solo activos</Label>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Sliders className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Disposición del grafo</Label>
                  <Select value={dagMode} onValueChange={onDagModeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar disposición" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Libre</SelectItem>
                      <SelectItem value="td">Arriba - Abajo</SelectItem>
                      <SelectItem value="bu">Abajo - Arriba</SelectItem>
                      <SelectItem value="lr">Izquierda - Derecha</SelectItem>
                      <SelectItem value="rl">Derecha - Izquierda</SelectItem>
                      <SelectItem value="radialout">Radial (hacia afuera)</SelectItem>
                      <SelectItem value="radialin">Radial (hacia adentro)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Distancia entre nodos</Label>
                    <span className="text-sm text-muted-foreground">
                      {linkDistance}px
                    </span>
                  </div>
                  <Slider
                    value={[linkDistance]}
                    onValueChange={([value]) => onLinkDistanceChange(value)}
                    min={50}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Tamaño de nodos</Label>
                    <span className="text-sm text-muted-foreground">
                      {nodeSize}
                    </span>
                  </div>
                  <Slider
                    value={[nodeSize]}
                    onValueChange={([value]) => onNodeSizeChange(value)}
                    min={5}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
};