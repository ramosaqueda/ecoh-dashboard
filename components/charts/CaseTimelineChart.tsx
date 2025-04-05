'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label as UILabel } from '@/components/ui/label';
import { Loader2, AlertCircle } from 'lucide-react';
import { useYearContext } from '@/components/YearSelector';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DelitoSelect from '@/components/select/DelitoSelect';

interface MonthlyData {
  month: string;
  count: number;
  countPrevYear?: number;
}

export default function CaseTimelineChart() {
  const { selectedYear } = useYearContext();
  const [localYear, setLocalYear] = useState(new Date().getFullYear().toString());
  const [data, setData] = useState<MonthlyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [caseType, setCaseType] = useState('all'); // "all" | "ecoh"
  const [showComparison, setShowComparison] = useState(true);
  
  // Estado para el filtro de delito
  const [tipoDelitoFilter, setTipoDelitoFilter] = useState('');

  // Generar array de años desde 2024 hasta el año actual
  const years = Array.from(
    { length: new Date().getFullYear() - 2023 },
    (_, i) => (2024 + i).toString()
  );

  // Actualizar el año local cuando cambia el año global, siempre que no sea "todos"
  useEffect(() => {
    if (selectedYear !== 'todos') {
      setLocalYear(selectedYear);
    }
  }, [selectedYear]);

  // No necesitamos cargar los tipos de delito aquí ya que DelitoSelect lo hace internamente

  const fetchDataForYear = async (year: string, type: string, tipoDelitoId: string) => {
    try {
      // Construir URL para la API
      const url = new URL('/api/analytics/case-timeline', window.location.origin);
      url.searchParams.append('type', type);
      url.searchParams.append('year', year);
      
      // Añadir filtro de tipo de delito si existe
      if (tipoDelitoId) {
        url.searchParams.append('delito_id', tipoDelitoId);
      }
      
      const response = await fetch(url.toString());
      
      if (!response.ok) throw new Error('Error al cargar datos');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching case timeline for year ${year}:`, error);
      return [];
    }
  };

  const fetchData = async (year: string, type: string, tipoDelitoId: string) => {
    setIsLoading(true);
    try {
      // Obtener datos del año seleccionado
      const currentYearData = await fetchDataForYear(year, type, tipoDelitoId);
      
      // Obtener datos del año anterior para comparación
      const prevYear = (parseInt(year) - 1).toString();
      const prevYearData = await fetchDataForYear(prevYear, type, tipoDelitoId);
      
      // Combinar datos para la visualización
      const combinedData = currentYearData.map((item: MonthlyData) => {
        const prevYearItem = prevYearData.find(
          (prev: MonthlyData) => prev.month === item.month
        );
        return {
          ...item,
          countPrevYear: prevYearItem ? prevYearItem.count : 0
        };
      });
      
      setData(combinedData);
    } catch (error) {
      console.error('Error fetching case timeline:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(localYear, caseType, tipoDelitoFilter);
  }, [localYear, caseType, tipoDelitoFilter]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-semibold">{entry.value}</span> casos
              {entry.dataKey === 'countPrevYear' 
                ? ` (${parseInt(localYear) - 1})` 
                : ` (${localYear})`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Función para obtener la etiqueta del delito para el título del gráfico
  const getDelitoLabel = () => {
    return tipoDelitoFilter ? 'Delito seleccionado' : 'Todos los delitos';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Casos por Mes</CardTitle>
            {selectedYear === 'todos' ? (
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="text-muted-foreground">Este gráfico requiere un año específico</span>
                <Select value={localYear} onValueChange={setLocalYear}>
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
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Año: {localYear}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <RadioGroup
                defaultValue="all"
                value={caseType}
                onValueChange={setCaseType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <UILabel htmlFor="all">Todas las causas</UILabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ecoh" id="ecoh" />
                  <UILabel htmlFor="ecoh">Solo causas ECOH</UILabel>
                </div>
              </RadioGroup>
              
              <div className="w-[200px]">
                <DelitoSelect
                  value={tipoDelitoFilter}
                  onValueChange={setTipoDelitoFilter}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center space-x-2 ml-auto">
                <Switch
                  id="compare-years"
                  checked={showComparison}
                  onCheckedChange={setShowComparison}
                />
                <UILabel htmlFor="compare-years">
                  Comparar con {parseInt(localYear) - 1}
                </UILabel>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  height={60}
                  tick={{ angle: -45, textAnchor: 'end' }}
                >
                  <Label value="Meses" position="bottom" offset={20} />
                </XAxis>
                <YAxis>
                  <Label
                    value="Número de Casos"
                    angle={-90}
                    position="left"
                    offset={-5}
                  />
                </YAxis>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  name={`${caseType === 'all' ? 'Todos los casos' : 'Casos ECOH'} - ${getDelitoLabel()} (${localYear})`}
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
                {showComparison && (
                  <Line
                    type="monotone"
                    dataKey="countPrevYear"
                    name={`${caseType === 'all' ? 'Todos los casos' : 'Casos ECOH'} - ${getDelitoLabel()} (${parseInt(localYear) - 1})`}
                    stroke="#82ca9d"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}