// utils/roles.ts

// Si usamos enum
export enum Role {
  ADMIN = 'ADMIN',
  WRITE = 'WRITE',
  READ = 'READ'
}

// Jerarquía de permisos (cada rol incluye los permisos de los roles inferiores)
export const roleHierarchy = {
  ADMIN: ['ADMIN', 'WRITE', 'READ'],
  WRITE: ['WRITE', 'READ'],
  READ: ['READ']
};

export const hasPermission = (userRole: Role, requiredRole: Role): boolean => {
  return roleHierarchy[userRole].includes(requiredRole);
};

// Middleware para verificar permisos
export const withRoleProtection = (handler: Function, requiredRole: Role) => {
  return async (req: any, res: any) => {
    const { user } = req;

    if (!user) {
      return Response.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!hasPermission(user.rol, requiredRole)) {
      return Response.json({ error: 'Permiso denegado' }, { status: 403 });
    }

    return handler(req, res);
  };
};
