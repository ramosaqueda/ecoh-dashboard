import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building, User, FileText, Calendar, AlertCircle, Tag, Briefcase, X, UserCircle } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DetailPanelProps {
  node: any;
  onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ node, onClose }) => {
  if (!node) return null;

  // Determinar título y contenido según el tipo de nodo
  let title = '';
  let icon = null;
  let content = null;

  switch (node.type) {
    case 'organization':
      title = 'Detalles de la Organización';
      icon = <Building className="h-5 w-5 text-blue-600" />;
      content = <OrganizationDetails org={node.org} />;
      break;
    case 'imputado':
      title = 'Detalles del Imputado';
      icon = <User className="h-5 w-5 text-green-600" />;
      content = <ImputadoDetails imputado={node.imputado} role={node.role} />;
      break;
    case 'causa':
      title = 'Detalles de la Causa';
      icon = <FileText className="h-5 w-5 text-orange-600" />;
      content = <CausaDetails causa={node.causa} delito={node.delito} />;
      break;
    default:
      title = 'Detalles';
      content = <p>No hay información disponible</p>;
  }

  return (
    <Sheet open={!!node} onOpenChange={() => node && onClose()}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="flex flex-row items-center gap-2">
          {icon}
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {content}
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Componente para detalles de organización
const OrganizationDetails = ({ org }) => {
  if (!org) return <p>No hay datos disponibles</p>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{org.nombre}</CardTitle>
          <CardDescription>
            {org.tipoOrganizacion?.nombre || 'Tipo no especificado'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Identificada: {new Date(org.fechaIdentificacion).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Miembros: {org.miembros?.length || 0}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Causas asociadas: {org.causas?.length || 0}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Estado: {org.activa ? 'Activa' : 'Inactiva'}
              </span>
            </div>
          </div>
          
          {org.descripcion && (
            <>
              <Separator className="my-2" />
              <p className="text-sm">{org.descripcion}</p>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Lista de Integrantes */}
      {org.miembros && org.miembros.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Integrantes</CardTitle>
            <CardDescription>
              Lista de miembros de la organización
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Rol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {org.miembros.map((miembro) => (
                  <TableRow key={miembro.id}>
                    <TableCell>
                      {miembro.imputado?.fotoPrincipal ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-green-500">
                          <img 
                            src={miembro.imputado.fotoPrincipal}
                            alt={miembro.imputado.nombreSujeto}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.parentElement.innerHTML = '<div class="w-8 h-8 bg-green-100 flex items-center justify-center rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-700"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg></div>';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-green-100 flex items-center justify-center rounded-full">
                          <UserCircle className="h-5 w-5 text-green-700" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {miembro.imputado?.nombreSujeto || 'Sin nombre'}
                    </TableCell>
                    <TableCell>
                      {miembro.rol || 'Miembro'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {/* Lista de Causas Asociadas */}
      {org.causas && org.causas.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Causas Asociadas</CardTitle>
            <CardDescription>
              Causas relacionadas con esta organización
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RUC</TableHead>
                  <TableHead>Denominación</TableHead>
                  <TableHead>Delito</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {org.causas.map((causaRelacion) => (
                  <TableRow key={causaRelacion.id}>
                    <TableCell>{causaRelacion.causa?.ruc || '-'}</TableCell>
                    <TableCell className="font-medium">
                      {causaRelacion.causa?.denominacionCausa || 'Sin nombre'}
                    </TableCell>
                    <TableCell>
                      {causaRelacion.causa?.delito?.nombre || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Componente para detalles de imputado
const ImputadoDetails = ({ imputado, role }) => {
  const [showFullPhoto, setShowFullPhoto] = useState(false);
  
  if (!imputado) return <p>No hay datos disponibles</p>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{imputado.nombreSujeto}</CardTitle>
          <CardDescription>{role || 'Miembro de la organización'}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mostrar fotografía en tamaño grande si está disponible */}
          {imputado.fotoPrincipal && (
            <div className="mb-4">
              <div 
                className="w-full h-64 rounded-md overflow-hidden border-2 border-green-600 cursor-pointer"
                onClick={() => setShowFullPhoto(true)}
              >
                <img 
                  src={imputado.fotoPrincipal} 
                  alt={imputado.nombreSujeto} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <p className="text-xs text-center mt-1 text-muted-foreground">
                Haga clic en la imagen para ampliar
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            {imputado.docId && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">ID: {imputado.docId}</span>
              </div>
            )}
            
            {imputado.nacionalidad && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Nacionalidad: {imputado.nacionalidad.nombre}</span>
              </div>
            )}
            
            {imputado.alias && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Alias: {imputado.alias}</span>
              </div>
            )}
          </div>
          
          {imputado.caracterisiticas && (
            <>
              <Separator className="my-2" />
              <p className="text-sm">{imputado.caracterisiticas}</p>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Modal para mostrar la imagen a pantalla completa */}
      {imputado.fotoPrincipal && (
        <Dialog open={showFullPhoto} onOpenChange={setShowFullPhoto}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden">
            <div className="relative">
              <button 
                className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white z-10"
                onClick={() => setShowFullPhoto(false)}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="w-full h-[80vh] flex items-center justify-center bg-black">
                <img 
                  src={imputado.fotoPrincipal} 
                  alt={imputado.nombreSujeto} 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Componente para detalles de causa
const CausaDetails = ({ causa, delito }) => {
  if (!causa) return <p>No hay datos disponibles</p>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{causa.denominacionCausa}</CardTitle>
          <CardDescription>{causa.ruc || 'Sin RUC'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {delito && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Delito: {delito}</span>
              </div>
            )}
            
            {causa.fechaDelHecho && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Fecha del hecho: {new Date(causa.fechaDelHecho).toLocaleDateString()}
                </span>
              </div>
            )}
            
            {causa.tribunal && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Tribunal: {causa.tribunal.nombre}</span>
              </div>
            )}
            
            {causa.fiscal && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Fiscal: {causa.fiscal.nombre}</span>
              </div>
            )}
          </div>
          
          {causa.observacion && (
            <>
              <Separator className="my-2" />
              <p className="text-sm">{causa.observacion}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};