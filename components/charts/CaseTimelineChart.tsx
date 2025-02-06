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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label as UILabel } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface MonthlyData {
  month: string;
  count: number;
}

export default function CaseTimelineChart() {
  const [data, setData] = useState<MonthlyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [caseType, setCaseType] = useState('all'); // "all" | "ecoh"

  const years = Array.from({ length: 5 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  const fetchData = async (year: string, type: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/analytics/case-timeline?year=${year}&type=${type}`
      );
      if (!response.ok) throw new Error('Error al cargar datos');
      const rawData = await response.json();
      setData(rawData);
    } catch (error) {
      console.error('Error fetching case timeline:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedYear, caseType);
  }, [selectedYear, caseType]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="font-semibold">{payload[0].value}</span> casos
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Casos por Mes</CardTitle>
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
          </div>

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
                   tick={({ x, y, payload }) => {
                     const words = payload.value.split(" ");
                     const offset = 20; 
                     return (
                       <>
                         {words.map((word: string, index: number) => (
                           <text
                             key={index}
                             x={x + index * 15}
                             y={y + offset}
                             textAnchor='end'
                             transform={`rotate(-45, ${x}, ${y})`}
                           >
                             {word}
                           </text>
                         ))}
                       </>
                     );
                   }}
                >
                  <Label value="Meses" position="bottom" offset={30} />
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
                  name={caseType === 'all' ? 'Todos los casos' : 'Casos ECOH'}
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
