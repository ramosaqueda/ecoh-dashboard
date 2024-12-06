import React, { useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from '@/components/ui/button';
import {Download} from 'lucide-react';

if (pdfMake && pdfFonts && pdfFonts.pdfMake?.vfs) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
} else {
    console.error('No se pudo asignar las fuentes vfs a pdfMake');
}

interface DatosCausa {
    RUC?: String | null;
    denominacion?: String | null;
    fiscal?: String | null;
    RIT?: String | null;
    delito?: String | null;
    folio_bw?: String | null;
    fecha_toma_conocimiento?: String | null;
    fecha_del_hecho?: String | null;
    estado_ecoh?: String | null;
}

const GeneratePdf = () => {

    const [pdfData, setPdfData] = useState<DatosCausa | undefined>(undefined);

    const generatePdf = (params: DatosCausa) => {

        const documentDefinition = {
            content : [
                { text: 'Detalles de la Causa', font: 'Roboto', bold: true, fontSize: 20},
                { text: `RUC: ${params.RUC}`, font: 'Roboto', bold: false, fontSize: 20 },
                { text: `\nDenominación: ${params.denominacion}`, font: 'Roboto', bold: true },
  
            ],
        };

        pdfMake.createPdf(documentDefinition).download(`CAUSA${params.RUC}.pdf`);

    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, field: keyof DatosCausa) => setPdfData ({
        ...pdfData,
        [field]: e.target.value,
    });

    return (
        <div className="hidden items-center space-x-2 md:flex ml-10">
              <Button variant="outline" size="default" onClick = {() => generatePdf(pdfData)}>   
              <Download className="h-4 w-4" />
              Descargar Informe
              </Button>
        </div>
    );
};

export default GeneratePdf;