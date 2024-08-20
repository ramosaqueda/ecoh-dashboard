'use client';

import { useState } from 'react';
import { Causa, columns } from '@/components/tables/causa-tables/columns';
import { CausasDataTable } from '@/components/tables/causa-tables/causas-table';

async function getCausas(): Promise<Causa[]> {
  // Aquí deberías hacer la llamada a tu API real
  const res = await fetch('http://localhost:3000/api/causas', {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch causas');
  }
  return res.json();
}

export default function CausasPage() {
  const [causas, setCausas] = useState<Causa[]>([]);

  useState(() => {
    getCausas().then(setCausas);
  }, []);

  const handleEdit = (causa: Causa) => {
    // Implementa la lógica de edición aquí
    console.log('Editar causa:', causa);
  };

  const handleDelete = async (id: string) => {
    // Implementa la lógica de eliminación aquí
    console.log('Eliminar causa con ID:', id);
    // Después de eliminar, actualiza el estado
    setCausas(causas.filter((causa) => causa.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Lista de Causas</h1>
      <CausasDataTable
        columns={columns}
        data={causas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
