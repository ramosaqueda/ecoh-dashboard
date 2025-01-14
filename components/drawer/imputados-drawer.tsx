import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { SquarePen } from 'lucide-react';
import ImputadoFormalizacionForm, { FormalizacionFormValues } from '@/components/forms/CausaImputadoForm/ImputadoFormalizacionForm';

import { Edit } from 'lucide-react';
type ImputadoInfo = {
  id: string;
  causaId: number;
  imputadoId: number;
  esImputado: boolean;
  essujetoInteres: boolean;
  formalizado: boolean;
  fechaFormalizacion: string | null;
  plazo: number | null;
  cautelarId: number | null;
  imputado: {
    nombreSujeto: string;
    fotoPrincipal?: string;
  };
  causa: {
    ruc: string;
  };
  cautelar: {
    nombre: string;
  } | null;
};

interface ImputadosDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  imputados: ImputadoInfo[];
  causaRuc: string;
}

export default function ImputadosDrawer({
  isOpen,
  onClose,
  imputados,
  causaRuc
}: ImputadosDrawerProps) {

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Imputados de la Causa</SheetTitle>
          <SheetDescription>RUC: {causaRuc}</SheetDescription>
        </SheetHeader>

        <ScrollArea className="mt-4 h-[calc(100vh-8rem)] pr-4">
          {imputados.length === 0 ? (
            <div className="py-4 text-center text-muted-foreground">
              No hay imputados registrados para esta causa.
            </div>
          ) : (
            <div className="space-y-4">
              {imputados.map((registro) => (
                <div
                  key={registro.id}
                  className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
                >
                  <div className="mb-2 flex items-center gap-4">
                    {registro.imputado.fotoPrincipal && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="flex-shrink-0">
                            <img
                              src={registro.imputado.fotoPrincipal}
                              alt={registro.imputado.nombreSujeto}
                              className="h-16 w-16 rounded-full object-cover cursor-pointer"
                            />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <div className="aspect-square w-full">
                            <img
                              src={registro.imputado.fotoPrincipal}
                              alt={registro.imputado.nombreSujeto}
                              className="h-full w-full object-contain rounded-lg"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    <div className="flex flex-grow items-center justify-between">
                      <h3 className="font-medium">
                        {registro.imputado.nombreSujeto}
                      </h3>
                      <div className="flex gap-2">
                        {registro.esImputado && (
                          <Badge className="bg-blue-500 hover:bg-blue-600">
                            Imputado
                          </Badge>
                        )}
                        {registro.essujetoInteres && (
                          <Badge
                            variant="secondary"
                            className="bg-amber-500 hover:bg-amber-600"
                          >
                            Sujeto de Interés
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 space-y-2 divide-y text-sm text-muted-foreground">
                    <div className="flex justify-between py-2">
                      <span>Formalizado:</span>
                      <span className="font-medium text-foreground" style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                        {registro.formalizado ? 'Sí' : 'No'}
                      <span className="flex justify-right">
                      <ImputadoFormalizacionForm
                        causaId={registro.causaId.toString()}
                        imputadoId={registro.imputadoId.toString()}
                        
                      />
                    
                      </span>
                      </span>
                    </div>
                    {registro.fechaFormalizacion && (
                      <div className="flex justify-between py-2">
                        <span>Fecha Formalización:</span>
                        <span className="font-medium text-foreground">
                          {format(
                            new Date(registro.fechaFormalizacion),
                            'dd/MM/yyyy',
                            { locale: es }
                          )}
                        </span>
                      </div>
                    )}
                    {registro.plazo !== null && registro.plazo > 0 && (
                      <div className="flex justify-between py-2">
                        <span>Plazo:</span>
                        <span className="font-medium text-foreground">
                          {registro.plazo} días
                        </span>
                      </div>
                    )}
                    {registro.cautelar && (
                      <div className="flex justify-between pt-2">
                        <span>Medida Cautelar:</span>
                        <span className="font-medium text-foreground">
                          {registro.cautelar.nombre.trim()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="mt-4">
          <SheetClose asChild>
            <Button className="w-full" variant="outline">
              Cerrar
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}