'use client';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface CausasCountResponse {
  count: number;
}

const CausasLegadaCard: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCausasCount = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/causas?count=true&causaLegada=true');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: CausasCountResponse = await response.json();
        setCount(data.count);
      } catch (err) {
        setError('Error al obtener el conteo de causas ECOH');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCausasCount();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">CAUSAS LEGADAS</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-4xl font-bold">{count !== null ? count : 'N/A'}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Causas Legadas en tramitación ECOH
        </p>
      </CardContent>
    </Card>
  );
};

export default CausasLegadaCard;
