// components/graph/detail/DetailPanel.tsx
'use client';

import { Group, User, Calendar, Info, Shield,Camera } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Imputado {
  id: number;
  nombreSujeto: string;
  docId: string;
  nacionalidad?: {
    id: number;
    nombre: string;
  };
}

interface Miembro {
  id: number;
  imputadoId: number;
  rol: string | null;
  fechaIngreso: string;
  fechaSalida: string | null;
  activo: boolean;
  imputado: Imputado;
}

interface Organization {
  id: number;
  nombre: string;
  descripcion?: string;
  fechaIdentificacion: string;
  createdAt: string;
  activa: boolean;
  tipoOrganizacion?: {
    id: number;
    nombre: string;
  };
  miembros?: Miembro[];
}

interface GraphNode {
  id: string;
  name: string;
  type: 'organization' | 'imputado';
  org?: Organization;
  imputado?: Imputado;
  organizaciones?: Organization[];
}

interface DetailPanelProps {
  node: GraphNode | null;
  onClose: () => void;
}

interface Fotografia {
  id: number;
  url?: string;
  filename: string;
  esPrincipal: boolean;
  createdAt: Date;
  updatedAt: Date;
  imputadoId: number;
}

interface Imputado {
  id: number;
  nombreSujeto: string;
  docId: string;
  nacionalidadId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  fotoPrincipal?: string;
  fotografias?: Fotografia[];
  nacionalidad?: {
    id: number;
    nombre: string;
  };
}

const OrganizationDetail = ({ organization }: { organization: Organization }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Info className="h-4 w-4" />
          Información General
        </h3>
        <div className="mt-2 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Estado:</span>
            <Badge variant={organization.activa ? "success" : "destructive"}>
              {organization.activa ? "Activa" : "Inactiva"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Tipo:</span>
            <span className="text-sm">{organization.tipoOrganizacion?.nombre}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Miembros:</span>
            <span className="text-sm">{organization.miembros?.length || 0}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Fechas
        </h3>
        <div className="mt-2 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Identificación:</span>
            <span className="text-sm">
              {new Date(organization.fechaIdentificacion).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Registro:</span>
            <span className="text-sm">
              {new Date(organization.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {organization.descripcion && (
        <div>
          <h3 className="text-sm font-medium">Descripción</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {organization.descripcion}
          </p>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Miembros Activos
        </h3>
        <div className="mt-2 space-y-2">
          {organization.miembros
            ?.filter(m => m.activo)
            .map((miembro) => (
              <div key={miembro.id} className="flex justify-between items-center p-2 bg-secondary rounded-md">
                <span className="text-sm">{miembro.imputado.nombreSujeto}</span>
                <Badge variant="outline">{miembro.rol || 'Sin rol'}</Badge>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const ImputadoDetail = ({ imputado, organizaciones }: { imputado: Imputado; organizaciones?: Organization[] }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Info className="h-4 w-4" />
          Información General
        </h3>
        <div className="mt-2 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Documento:</span>
            <span className="text-sm">{imputado.docId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Nacionalidad:</span>
            <span className="text-sm">{imputado.nacionalidad?.nombre || 'No especificada'}</span>
          </div>
        </div>
      </div>

      {organizaciones && organizaciones.length > 0 && (
        <div>
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Group className="h-4 w-4" />
            Organizaciones
          </h3>
          <div className="mt-2 space-y-2">
            {organizaciones.map((org) => (
              <div key={org.id} className="flex justify-between items-center p-2 bg-secondary rounded-md">
                <span className="text-sm">{org.nombre}</span>
                <Badge variant={org.activa ? "success" : "destructive"}>
                  {org.activa ? "Activa" : "Inactiva"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}


 
      {/* Sección de fotografías */}
      {(imputado.fotoPrincipal || imputado.fotografias?.length > 0) && (
        <div>
          <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
            <Camera className="h-4 w-4" />
            Fotografías
          </h3>
          
          {/* Foto Principal */}
          {imputado.fotoPrincipal && (
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-primary/20">
                <img
                  src={imputado.fotoPrincipal}
                  alt={`Foto principal de ${imputado.nombreSujeto}`}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/128?text=Sin+Foto";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                  <span className="text-xs text-white">Principal</span>
                </div>
              </div>
            </div>
          )}

          {/* Galería de fotos adicionales */}
          {imputado.fotografias && imputado.fotografias.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {imputado.fotografias
                .filter(foto => !foto.esPrincipal && foto.url)
                .map((foto) => (
                  <div key={foto.id} className="relative aspect-square rounded-md overflow-hidden border border-border">
                    <img
                      src={foto.url}
                      alt={foto.filename}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/100?text=Error";
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-1 py-0.5">
                      <span className="text-xs text-white truncate block">
                        {new Date(foto.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const DetailPanel = ({ node, onClose }: DetailPanelProps) => {
  if (!node) return null;

  const isOrganization = node.type === 'organization';

  return (
    <Sheet open={!!node} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center gap-2">
              {isOrganization ? <Group className="h-5 w-5" /> : <User className="h-5 w-5" />}
              {node.name}
            </SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="mt-6 h-[calc(100vh-120px)]">
          {isOrganization ? (
            <OrganizationDetail organization={node.org!} />
          ) : (
            <ImputadoDetail 
              imputado={node.imputado!}
              organizaciones={node.organizaciones}
            />
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default DetailPanel;