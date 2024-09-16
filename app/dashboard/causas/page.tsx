'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Causa, columns } from '@/components/tables/causa-tables/columns';
import { CausasDataTable } from '@/components/tables/causa-tables/causas-table';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import CauseFormContainer from '@/components/CauseFormContainer';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', email: '' });
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

  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = Math.max(...data.map((item) => item.id)) + 1;
    setData([...data, { id: newId, ...newItem }]);
    setNewItem({ name: '', email: '' });
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-10">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar caso</DialogTitle>
          </DialogHeader>
          <CauseFormContainer />
        </DialogContent>
      </Dialog>

      <CausasDataTable
        columns={columns}
        data={causas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
