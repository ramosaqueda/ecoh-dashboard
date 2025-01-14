// components/graph/detail/DetailPanel.tsx
import React from 'react';
import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
   
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, User2, Image,ZoomIn } from "lucide-react";
import { ImageGallery } from '@/components/graph/detail/ImageGallery';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
interface DetailPanelProps {
  node: any | null;
  onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <Sheet open={!!node} onOpenChange={() => onClose()}>
      <SheetContent className="sm:max-w-xl lg:max-w-2xl w-full overflow-y-auto">
        <ScrollArea className="h-full pr-4">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {node.type === 'organization' ? (
                <>
                  <Building2 className="h-5 w-5" />
                  Detalles de la Organización
                </>
              ) : (
                <>
                  <User2 className="h-5 w-5" />
                  Detalles del sujeto
                </>
              )}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {node.type === 'organization' ? (
              <OrganizacionDetails node={node} />
            ) : (
              <ImputadoDetails node={node} />
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

const OrganizacionDetails: React.FC<{ node: any }> = ({ node }) => {
  const org = node.org;
  const [memberPhotos, setMemberPhotos] = useState<{ [key: number]: any[] }>({});
  const [loadingPhotos, setLoadingPhotos] = useState<{ [key: number]: boolean }>({});
  const [selectedMember, setSelectedMember] = useState<{
    photos: any[];
    name: string;
  } | null>(null);

  useEffect(() => {
    const fetchMemberPhotos = async () => {
      if (!org?.miembros) return;

      const photoRequests = org.miembros.map(async (miembro: any) => {
        try {
          setLoadingPhotos(prev => ({
            ...prev,
            [miembro.imputadoId]: true
          }));

          const response = await fetch(`/api/imputado/${miembro.imputadoId}/photos`);
          if (!response.ok) throw new Error('Error al cargar fotos');
          
          const photos = await response.json();
          setMemberPhotos(prev => ({
            ...prev,
            [miembro.imputadoId]: photos
          }));
        } catch (error) {
          console.error(`Error loading photos for member ${miembro.imputadoId}:`, error);
          setMemberPhotos(prev => ({
            ...prev,
            [miembro.imputadoId]: []
          }));
        } finally {
          setLoadingPhotos(prev => ({
            ...prev,
            [miembro.imputadoId]: false
          }));
        }
      });

      await Promise.all(photoRequests);
    };

    fetchMemberPhotos();
  }, [org?.miembros]);

  if (!org) return null;

  const handlePhotoClick = (miembro: any) => {
    const photos = memberPhotos[miembro.imputadoId] || [];
    if (photos.length > 0) {
      setSelectedMember({
        photos,
        name: miembro.imputado?.nombreSujeto || 'Imputado'
      });
    }
  };

  return (
    <>
      <Card className="p-4 space-y-4">
        {/* ... otros elementos se mantienen igual ... */}

        {org.miembros && org.miembros.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Miembros
            </h3>
            <div className="space-y-3">
              {org.miembros.map((miembro: any) => (
                <div
                  key={miembro.imputadoId}
                  className="flex items-start gap-3 p-2 bg-muted rounded-md"
                >
                  {/* Contenedor de la foto modificado */}
                  <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                    {loadingPhotos[miembro.imputadoId] ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900" />
                      </div>
                    ) : memberPhotos[miembro.imputadoId]?.length > 0 ? (
                      <div 
                        className="cursor-pointer group w-full h-full"
                        onClick={() => handlePhotoClick(miembro)}
                      >
                        <img
                          src={memberPhotos[miembro.imputadoId][0].url}
                          alt={`Foto de ${miembro.imputado?.nombreSujeto}`}
                          className="w-full h-full object-cover object-center transition-transform group-hover:scale-105"
                        />
                        {memberPhotos[miembro.imputadoId].length > 1 && (
                          <div className="absolute bottom-0 right-0 bg-black/70 text-white text-[10px] px-1 rounded-tl">
                            +{memberPhotos[miembro.imputadoId].length - 1}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <ZoomIn className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <User2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Contenido del miembro */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {miembro.imputado?.nombreSujeto}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {miembro.rol || "Sin rol especificado"}
                    </p>
                  </div>
                  <Badge variant={miembro.activo ? "outline" : "secondary"} className="flex-shrink-0">
                    {miembro.activo ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {selectedMember && (
        <Dialog 
          open={!!selectedMember} 
          onOpenChange={(open) => !open && setSelectedMember(null)}
        >
          <DialogContent className="max-w-[90vw] max-h-[90vh]">
            <ImageGallery 
              images={selectedMember.photos}
              title={`Fotos de ${selectedMember.name}`}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

const ImputadoDetails: React.FC<{ node: any }> = ({ node }) => {
  const imputado = node.imputado;
  const [fotos, setFotos] = useState<any[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFotos = async () => {
      if (!imputado?.id) return;
      
      try {
        setLoadingPhotos(true);
        const response = await fetch(`/api/imputado/${imputado.id}/photos`);
        
        if (!response.ok) {
          throw new Error('Error al cargar las fotos');
        }
        
        const data = await response.json();
        setFotos(data);
      } catch (err) {
        console.error('Error cargando fotos:', err);
        setError('No se pudieron cargar las fotos');
      } finally {
        setLoadingPhotos(false);
      }
    };

    fetchFotos();
  }, [imputado?.id]);

  if (!imputado) return null;

  return (
    <>
      <Card className="p-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Nombre</h3>
          <p className="text-lg font-semibold">{imputado.nombreSujeto}</p>
        </div>

        {imputado.alias && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Alias</h3>
            <p>{imputado.alias}</p>
          </div>
        )}

        {imputado.caracterisiticas && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Características</h3>
            <p>{imputado.caracterisiticas}</p>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Image className="h-4 w-4" />
            Galería de fotos
          </h3>
          <div className="mt-2">
            {loadingPhotos ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            ) : error ? (
              <div className="text-sm text-red-500 p-2">{error}</div>
            ) : fotos.length === 0 ? (
              <div className="text-sm text-muted-foreground p-2">
                No hay fotos disponibles
              </div>
            ) : (
              <ImageGallery 
                images={fotos}
                title={`Fotos de ${imputado.nombreSujeto}`}
              />
            )}
          </div>
        </div>

        {node.organizaciones && node.organizaciones.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Organizaciones
            </h3>
            <div className="space-y-2">
              {node.organizaciones.map((org: any) => (
                <div
                  key={org.id}
                  className="flex items-center justify-between p-2 bg-muted rounded-md"
                >
                  <div>
                    <p className="font-medium">{org.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {org.miembros?.find((m: any) => m.imputadoId === imputado.id)?.rol || "Sin rol especificado"}
                    </p>
                  </div>
                  <Badge variant={org.activa ? "outline" : "secondary"}>
                    {org.activa ? "Activa" : "Inactiva"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </>
  );
};

export default DetailPanel;