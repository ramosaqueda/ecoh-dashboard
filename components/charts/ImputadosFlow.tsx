'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { ResponsiveSankey } from '@nivo/sankey';
import { useYearContext } from '@/components/YearSelector';

interface FlowData {
  nodes: Array<{
    id: string;
    color: string;
  }>;
  links: Array<{
    source: string;
    target: string;
    value: number;
  }>;
}

export function ImputadosFlow() {
  const { selectedYear } = useYearContext();
  const [data, setData] = useState<FlowData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/analytics/imputados-flow?year=${selectedYear}`
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Flujo Gestión de causas con imputados</CardTitle>
        <div className="text-sm text-muted-foreground">
          Año: {selectedYear}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[400px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : data ? (
          <div className="h-[400px]">
            <ResponsiveSankey
              data={data}
              margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
              align="justify"
              colors={{ scheme: 'category10' }}
              nodeOpacity={1}
              nodeHoverOthersOpacity={0.35}
              nodeThickness={18}
              nodeSpacing={24}
              nodeBorderWidth={0}
              nodeBorderRadius={3}
              linkOpacity={0.5}
              linkHoverOpacity={0.6}
              linkHoverOthersOpacity={0.1}
              linkContract={3}
              enableLinkGradient={true}
              labelPosition="outside"
              labelOrientation="horizontal"
              labelPadding={16}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1]]
              }}
              animate={true}
              motionConfig="gentle"
              tooltip={({ node, value }) => (
                <div className="rounded-lg border bg-white p-2 shadow-lg">
                  <strong>{node.id}</strong>: {value}
                </div>
              )}
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}