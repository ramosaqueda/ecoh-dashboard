// utils/roles.ts

// Definimos los roles como constantes
export const ROLES = {
  ADMIN: 'ADMIN',
  WRITE: 'WRITE',
  READ: 'READ'
} as const;

// Creamos un tipo basado en las constantes
export type Role = typeof ROLES[keyof typeof ROLES];

// Jerarquía de permisos (cada rol incluye los permisos de los roles inferiores)
export const roleHierarchy: Record<Role, Role[]> = {
  [ROLES.ADMIN]: [ROLES.ADMIN, ROLES.WRITE, ROLES.READ],
  [ROLES.WRITE]: [ROLES.WRITE, ROLES.READ],
  [ROLES.READ]: [ROLES.READ]
};

export const hasPermission = (userRole: string | undefined | null, requiredRole: Role): boolean => {
  // Si no hay rol de usuario, no tiene permisos
  if (!userRole) return false;
  
  // Si el rol de usuario no existe en la jerarquía, no tiene permisos
  if (!Object.keys(roleHierarchy).includes(userRole)) return false;
  
  // Verificar si el rol del usuario incluye el permiso requerido
  return roleHierarchy[userRole as Role].includes(requiredRole);
};

// Custom hook para manejar permisos en componentes
export const usePermissions = (userRole: string | undefined | null) => {
  return {
    isAdmin: () => hasPermission(userRole, ROLES.ADMIN),
    canWrite: () => hasPermission(userRole, ROLES.WRITE),
    canRead: () => hasPermission(userRole, ROLES.READ),
    checkPermission: (requiredRole: Role) => hasPermission(userRole, requiredRole)
  };
};

// Ejemplo de uso en un componente:
/*
const YourComponent = () => {
  const [userData, setUserData] = useState<any>(null);
  const { isAdmin, canWrite } = usePermissions(userData?.rol);

  useEffect(() => {
    if (userData) {
      setIsAdmin(isAdmin());
    }
  }, [userData]);
}
*/