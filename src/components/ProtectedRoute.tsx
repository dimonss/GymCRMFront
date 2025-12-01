import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRole
}) => {
    // MOCK: Bypass authentication checks for development/testing
    // const { isAuthenticated, hasRole } = useAuth();

    // if (!isAuthenticated) {
    //     // Redirect to home with a state indicating login is required
    //     return <Navigate to="/" state={{ requiresAuth: true }} replace />;
    // }

    // if (requiredRole && !hasRole(requiredRole)) {
    //     // User doesn't have required role, redirect to home
    //     return <Navigate to="/" replace />;
    // }

    return <>{children}</>;
};
