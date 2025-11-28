import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, UserRole } from '@/types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for authentication
const mockUsers: User[] = [
    {
        id: '1',
        email: 'admin@gymcrm.ru',
        name: 'Администратор',
        role: 'super_admin',
    },
    {
        id: '2',
        email: 'club@titan.ru',
        name: 'Менеджер Titan Fitness',
        role: 'club_admin',
        clubId: '1',
    },
    {
        id: '3',
        email: 'club@champions.ru',
        name: 'Менеджер Champions Boxing',
        role: 'club_admin',
        clubId: '2',
    },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('gymcrm_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('gymcrm_user');
            }
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock authentication - in real app, this would be an API call
        const foundUser = mockUsers.find(u => u.email === email);

        if (foundUser && password === 'password') {
            setUser(foundUser);
            localStorage.setItem('gymcrm_user', JSON.stringify(foundUser));
            return true;
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('gymcrm_user');
    };

    const hasRole = (role: UserRole): boolean => {
        if (!user) return false;

        // super_admin has access to everything
        if (user.role === 'super_admin') return true;

        return user.role === role;
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        hasRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
