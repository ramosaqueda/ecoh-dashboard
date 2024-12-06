'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Loader2, AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';

interface EsclarecimientoData {
  totalCausas: number;
  causasEsclarecidas: number;
  porcentaje: number;
  detalles: {
    causasFormalizadas: number;
    causasConCautelar: number;
    causasAmbasSituaciones: number;
  };
}

export function EsclarecimientoCard() {
  const [data, setData] = useState<EsclarecimientoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  const years = Array.from({ length: 5 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/analytics/tasa-esclarecimiento?year=${selectedYear}`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error:', error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  const getColorByPercentage = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-2 py-10">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <p className="text-sm text-muted-foreground">Error al cargar datos</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <CardTitle>Tasa de Esclarecimiento</CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Causas con imputados formalizados y/o</p>
                <p>con medidas cautelares vigentes</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                {data.causasEsclarecidas} de {data.totalCausas} causas
              </span>
              <span className="font-bold">{data.porcentaje?.toFixed(1)}%</span>
            </div>
            <Progress
              value={data.porcentaje}
              className={getColorByPercentage(data.porcentaje)}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-lg bg-slate-100 p-2">
              <p className="text-muted-foreground">Formalizadas</p>
              <p className="text-xl font-bold">
                {data.detalles.causasFormalizadas}
              </p>
            </div>
            <div className="rounded-lg bg-slate-100 p-2">
              <p className="text-muted-foreground">Con Cautelar</p>
              <p className="text-xl font-bold">
                {data.detalles.causasConCautelar}
              </p>
            </div>
            <div className="rounded-lg bg-slate-100 p-2">
              <p className="text-muted-foreground">Ambas</p>
              <p className="text-xl font-bold">
                {data.detalles.causasAmbasSituaciones}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
