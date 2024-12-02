// app/admin/users/sync/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import PageContainer from '@/components/layout/page-container';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, UserPlus, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClerkUser {
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  isSynced: boolean;
}

interface DBUser {
  id: number;
  clerkId: string;
  email: string;
  nombre: string;
  rolId: number;
}

export default function UserSyncPage() {
  const [clerkUsers, setClerkUsers] = useState<ClerkUser[]>([]);
  const [dbUsers, setDbUsers] = useState<DBUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const { user: currentUser } = useUser();

  // Cargar usuarios de Clerk y de la base de datos
  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const [clerkResponse, dbResponse] = await Promise.all([
        fetch('/api/admin/users/clerk'),
        fetch('/api/admin/users/db')
      ]);

      if (!clerkResponse.ok || !dbResponse.ok) {
        throw new Error('Error al cargar los usuarios');
      }

      const clerkData = await clerkResponse.json();
      const dbData = await dbResponse.json();

      // Marcar usuarios ya sincronizados
      const syncedUsers = clerkData.map((user: any) => ({
        ...user,
        isSynced: dbData.some((dbUser: DBUser) => dbUser.clerkId === user.id)
      }));

      setClerkUsers(syncedUsers);
      setDbUsers(dbData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los usuarios',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const syncUser = async (clerkId: string, rolId: number) => {
    setIsSyncing((prev) => ({ ...prev, [clerkId]: true }));
    try {
      const response = await fetch('/api/admin/users/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clerkId, rolId })
      });

      if (!response.ok) throw new Error('Error al sincronizar usuario');

      toast({
        title: 'Éxito',
        description: 'Usuario sincronizado correctamente'
      });

      loadUsers(); // Recargar usuarios
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo sincronizar el usuario',
        variant: 'destructive'
      });
    } finally {
      setIsSyncing((prev) => ({ ...prev, [clerkId]: false }));
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Sincronización de Usuarios
          </h2>
          <Button
            onClick={loadUsers}
            variant="outline"
            className="gap-2"
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
            />
            Actualizar
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuarios de Clerk</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center">
                      <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : clerkUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center">
                      No hay usuarios para mostrar
                    </TableCell>
                  </TableRow>
                ) : (
                  clerkUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.emailAddress}</TableCell>
                      <TableCell>
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>
                        {user.isSynced ? (
                          <Badge variant="success">Sincronizado</Badge>
                        ) : (
                          <Badge variant="secondary">Pendiente</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {!user.isSynced && (
                          <Select
                            onValueChange={(value) =>
                              syncUser(user.id, parseInt(value))
                            }
                            disabled={isSyncing[user.id]}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Admin</SelectItem>
                              <SelectItem value="2">Write</SelectItem>
                              <SelectItem value="3">Read</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {!user.isSynced && (
                          <Button
                            size="sm"
                            onClick={() => syncUser(user.id, 3)}
                            disabled={isSyncing[user.id]}
                            className="gap-2"
                          >
                            {isSyncing[user.id] ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <UserPlus className="h-4 w-4" />
                            )}
                            Sincronizar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
