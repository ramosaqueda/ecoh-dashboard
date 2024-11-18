'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CausaImputado } from '@/types/causaimputado';
import { format } from 'date-fns';
import {
  FileText,
  CalendarDays,
  User,
  UserRoundSearch,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface CausasGridProps {
  causas: CausaImputado[];
}

export const CausasGrid = ({ causas }: CausasGridProps) => {
  if (causas.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No hay causas asociadas a este imputado
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {causas.map((causa) => (
          <AccordionItem
            key={causa.id}
            value={causa.id}
            className="rounded-lg border px-2"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-1 items-center gap-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{causa.causa.ruc}</span>
                </div>
                <span className="truncate text-sm font-normal text-muted-foreground">
                  {causa.causa.denominacionCausa}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-2">
                {/* Calidad del sujeto */}
                <div className="flex flex-wrap items-center gap-2">
                  {causa.esImputado && (
                    <Badge className="bg-blue-500">
                      <User className="mr-1 h-3 w-3" />
                      Imputado
                    </Badge>
                  )}
                  {causa.essujetoInteres && (
                    <Badge variant="secondary" className="bg-amber-500">
                      <UserRoundSearch className="mr-1 h-3 w-3" />
                      Sujeto de Interés
                    </Badge>
                  )}
                </div>

                {/* Estado de formalización */}
                <div className="flex items-center gap-2">
                  {causa.formalizado ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Formalizado</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">No Formalizado</span>
                    </div>
                  )}
                </div>

                {/* Fecha de formalización */}
                {causa.formalizado && causa.fechaFormalizacion && (
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Fecha de Formalización:{' '}
                      {format(new Date(causa.fechaFormalizacion), 'dd/MM/yyyy')}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-4 p-2">
                {/* Plazo */}
                {causa.plazo !== null && causa.plazo > 0 && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Plazo: {causa.plazo} días</span>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
};
