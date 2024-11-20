'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface DayData {
  date: string;
  count: number;
}

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic'
];

export function CasesHeatmap() {
  const [data, setData] = useState<DayData[]>([]);
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
          `/api/analytics/cases-heatmap?year=${selectedYear}`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  const getColor = (count: number) => {
    const max = Math.max(...data.map((d) => d.count));
    if (max === 0) return 'rgb(254, 242, 242)'; // rose-50 para cuando no hay datos

    const intensity = count / max;

    if (intensity === 0) return 'rgb(254, 242, 242)'; // rose-50
    if (intensity <= 0.2) return 'rgb(254, 205, 211)'; // rose-200
    if (intensity <= 0.4) return 'rgb(251, 155, 171)'; // rose-300
    if (intensity <= 0.6) return 'rgb(244, 114, 140)'; // rose-400
    if (intensity <= 0.8) return 'rgb(236, 72, 107)'; // rose-500
    return 'rgb(225, 29, 72)'; // rose-600
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Intensidad de Casos por Día</CardTitle>
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
      <CardContent>
        {isLoading ? (
          <div className="flex h-[200px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-[auto_repeat(52,1fr)] gap-2">
              <div /> {/* Espacio para alinear con la grilla */}
              {MONTHS.map((month, i) => (
                <div
                  key={month}
                  className="text-xs text-muted-foreground"
                  style={{
                    gridColumn: `${
                      Math.floor((i * 52) / 12) + 2
                    } / span ${Math.floor(52 / 12)}`
                  }}
                >
                  {month}
                </div>
              ))}
              {DAYS.map((day) => (
                <div key={day} className="text-xs text-muted-foreground">
                  {day}
                </div>
              ))}
              {data.map((day, i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-sm transition-all hover:ring-2 hover:ring-rose-500 hover:ring-offset-2"
                  style={{ backgroundColor: getColor(day.count) }}
                  title={`${formatDate(day.date)}: ${day.count} casos`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <div className="text-sm font-medium">
                Total: {data.reduce((sum, day) => sum + day.count, 0)} casos
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-sm bg-rose-100" />
                  Menos
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-sm bg-rose-600" />
                  Más
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
