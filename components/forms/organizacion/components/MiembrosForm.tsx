import { useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from '@/components/ui/table';
import MiembroItem from './MiembroItem';

import { Imputado, Miembro } from '@/types/organizacion.types';

interface MiembrosFormProps {
  miembros: Miembro[];
  imputados: Imputado[];
  isLoading?: boolean;
  onAddMiembro: () => void;
  onUpdateMiembro: (index: number, field: string, value: any) => void;
  onRemoveMiembro: (index: number) => void;
}

function MiembrosForm({
  miembros,
  imputados,
  isLoading = false,
  onAddMiembro,
  onUpdateMiembro,
  onRemoveMiembro
}: MiembrosFormProps) {
  const [openCombobox, setOpenCombobox] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleOpenComboboxChange = (index: number, open: boolean) => {
    setOpenCombobox((prev) => ({
      ...prev,
      [index]: open
    }));
  };

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Lista de Miembros</h3>
          <Button onClick={onAddMiembro} type="button" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Agregando...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Miembro
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imputado</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Orden</TableHead>
                <TableHead>Fecha Ingreso</TableHead>
                <TableHead>Fecha Salida</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {miembros.map((miembro, index) => (
                <MiembroItem
                  key={index}
                  miembro={miembro}
                  index={index}
                  imputados={imputados}
                  openCombobox={openCombobox[index] || false}
                  onOpenComboboxChange={(open) =>
                    handleOpenComboboxChange(index, open)
                  }
                  onUpdate={onUpdateMiembro}
                  onRemove={onRemoveMiembro}
                />
              ))}
              {miembros.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No hay miembros agregados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default MiembrosForm;
