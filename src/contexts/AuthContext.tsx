
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

// Tipos para nuestro contexto
type User = {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  logout: () => void;
};

// Datos de administradores (en una aplicación real, esto estaría en una base de datos)
const ADMIN_USERS = [
  { id: '1', username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'admin' as const },
  { id: '2', username: 'superadmin', email: 'super@example.com', password: 'super123', role: 'admin' as const }
];

// Base de usuarios registrados (simulada)
const USERS_STORAGE_KEY = 'registered_users';

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

  // Obtener usuarios registrados
  const getRegisteredUsers = () => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    return [];
  };

  // Guardar usuario registrado
  const saveRegisteredUser = (user: any) => {
    const users = getRegisteredUsers();
    users.push(user);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // Función de registro
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Comprobar si el email ya está registrado
        const users = getRegisteredUsers();
        const existingUser = [...ADMIN_USERS, ...users].find(u => u.email === email);
        
        if (existingUser) {
          toast({
            title: 'Error de registro',
            description: 'Este correo electrónico ya está registrado',
            variant: 'destructive',
          });
          
          setIsLoading(false);
          resolve(false);
          return;
        }
        
        // Crear nuevo usuario
        const newUser = {
          id: uuidv4(),
          username,
          email,
          password,
          role: 'user' as const
        };
        
        // Guardar usuario
        saveRegisteredUser(newUser);
        
        // Iniciar sesión automáticamente
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        toast({
          title: '¡Registro exitoso!',
          description: `Bienvenido, ${username}`,
        });
        
        setIsLoading(false);
        resolve(true);
      }, 800);
    });
  };

  // Función de login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Buscar en admins y usuarios registrados
        const allUsers = [...ADMIN_USERS, ...getRegisteredUsers()];
        const foundUser = allUsers.find(
          u => u.email === email && u.password === password
        );
        
        if (foundUser) {
          // Omitir la contraseña del objeto usuario
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          // Guardar en localStorage
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          
          toast({
            title: '¡Bienvenido!',
            description: `Sesión iniciada como ${foundUser.username}`,
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
      }, 800);
    });
  };

  // Función de login con Google
  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular login con Google
        const googleUser = {
          id: uuidv4(),
          username: 'Usuario de Google',
          email: `google_${Math.floor(Math.random() * 10000)}@gmail.com`,
          role: 'user' as const
        };
        
        setUser(googleUser);
        localStorage.setItem('user', JSON.stringify(googleUser));
        
        toast({
          title: '¡Login con Google exitoso!',
          description: 'Has iniciado sesión con tu cuenta de Google',
        });
        
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  // Función de recuperación de contraseña
  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Verificar si el email existe
        const allUsers = [...ADMIN_USERS, ...getRegisteredUsers()];
        const foundUser = allUsers.find(u => u.email === email);
        
        if (foundUser) {
          toast({
            title: 'Recuperación de contraseña enviada',
            description: 'Se ha enviado un enlace de recuperación a tu correo electrónico',
          });
          
          setIsLoading(false);
          resolve(true);
        } else {
          toast({
            title: 'Error',
            description: 'No existe una cuenta con este correo electrónico',
            variant: 'destructive',
          });
          
          setIsLoading(false);
          resolve(false);
        }
      }, 800);
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
        register,
        loginWithGoogle,
        resetPassword,
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
