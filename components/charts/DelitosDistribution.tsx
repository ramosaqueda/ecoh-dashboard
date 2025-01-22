'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface DelitoData {
  name: string;
  value: number;
  total: number;
  visible?: boolean;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
  'hsl(var(--chart-7))',
  'hsl(var(--chart-8))'
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.value / data.total) * 100).toFixed(1);

    return (
      <div className="rounded-lg border bg-white p-3 shadow-lg">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm">{data.value} casos</p>
        <p className="text-xs text-muted-foreground">{percentage}%</p>
      </div>
    );
  }
  return null;
};

export function DelitosDistribution() {
  const [rawData, setRawData] = useState<DelitoData[]>([]);
  const [filteredData, setFilteredData] = useState<DelitoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [showOnlyECOH, setShowOnlyECOH] = useState(false);

  const years = Array.from({ length: 5 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/analytics/delitos-distribution?year=${selectedYear}&onlyEcoh=${showOnlyECOH}`
        );
        if (!response.ok) throw new Error('Error al cargar datos');

        const jsonData = await response.json();
        const total = Object.values(jsonData).reduce(
          (a: number, b: number) => a + b,
          0
        );

        const formattedData = Object.entries(jsonData)
          .map(([name, value]: [string, any]) => ({
            name,
            value,
            total,
            visible: true
          }))
          .sort((a, b) => b.value - a.value);

        setRawData(formattedData);
        
        // Initialize filtered data
        const initialFiltered = showOnlyECOH 
          ? formattedData.filter(item => item.name.toLowerCase().includes('ecoh'))
          : formattedData;
        
        setFilteredData(initialFiltered);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  // Handle ECOH filter changes
  useEffect(() => {
    const newFilteredData = showOnlyECOH
      ? rawData.filter(item => item.name.toLowerCase().includes('ecoh'))
      : rawData;
    
    // Recalculate total for filtered data
    const filteredTotal = newFilteredData.reduce((acc, item) => acc + (item.visible ? item.value : 0), 0);
    
    const updatedData = newFilteredData.map(item => ({
      ...item,
      total: filteredTotal
    }));

    setFilteredData(updatedData);
  }, [showOnlyECOH, rawData]);

  const toggleSeriesVisibility = (seriesName: string) => {
    const updatedData = filteredData.map(item => {
      if (item.name === seriesName) {
        return { ...item, visible: !item.visible };
      }
      return item;
    });

    // Recalculate total for visible items
    const visibleTotal = updatedData.reduce((acc, item) => 
      acc + (item.visible ? item.value : 0), 0
    );

    const finalData = updatedData.map(item => ({
      ...item,
      total: visibleTotal
    }));

    setFilteredData(finalData);
  };

  // Get only visible data for chart
  const visibleData = filteredData.filter(item => item.visible);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Distribución por Delito</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="ecoh-filter"
              checked={showOnlyECOH}
              onCheckedChange={setShowOnlyECOH}
            />
            <Label htmlFor="ecoh-filter">Solo ECOH</Label>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
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
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[200px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-[200px]">
              {visibleData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visibleData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {visibleData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No hay datos para mostrar
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {filteredData.map((entry, index) => (
                <div 
                  key={entry.name} 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleSeriesVisibility(entry.name)}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-sm ${!entry.visible && 'opacity-30'}`}
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className={`truncate ${!entry.visible && 'opacity-30'}`}>
                    {entry.name}
                  </span>
                  <span className={`ml-auto font-medium ${!entry.visible && 'opacity-30'}`}>
                    {entry.visible ? ((entry.value / entry.total) * 100).toFixed(1) : '0.0'}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}