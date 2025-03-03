
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Tipos para nuestro contexto
type User = {
  id: string;
  username: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Datos de administradores (en una aplicación real, esto estaría en una base de datos)
const ADMIN_USERS = [
  { id: '1', username: 'admin', password: 'admin123', role: 'admin' as const },
  { id: '2', username: 'superadmin', password: 'super123', role: 'admin' as const }
];

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Verificar si hay una sesión guardada al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Función de login
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular una llamada a la API con un pequeño retraso
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = ADMIN_USERS.find(
          u => u.username === username && u.password === password
        );
        
        if (foundUser) {
          // Omitir la contraseña del objeto usuario
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          // Guardar en localStorage
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          
          toast({
            title: '¡Bienvenido!',
            description: `Sesión iniciada como ${username}`,
          });
          
          setIsLoading(false);
          resolve(true);
        } else {
          toast({
            title: 'Error de inicio de sesión',
            description: 'Credenciales incorrectas',
            variant: 'destructive',
          });
          
          setIsLoading(false);
          resolve(false);
        }
      }, 800); // Pequeño retraso para simular una API
    });
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'Sesión cerrada',
      description: 'Has cerrado sesión correctamente',
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
