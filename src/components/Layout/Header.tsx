import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import './Header.css';

export const Header: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header className="header glass">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <span className="logo-icon">💪</span>
                        <span className="logo-text gradient-text">GymCRM</span>
                    </Link>

                    <nav className="nav">
                        <Link to="/" className="nav-link">
                            Главная
                        </Link>
                        <Link to="/application" className="nav-link">
                            Подать заявку
                        </Link>
                        {isAuthenticated && user?.role === 'club_admin' && (
                            <Link to="/crm" className="nav-link">
                                CRM
                            </Link>
                        )}
                        {isAuthenticated && user?.role === 'super_admin' && (
                            <Link to="/admin" className="nav-link">
                                Админка
                            </Link>
                        )}
                    </nav>

                    <div className="header-actions">
                        {isAuthenticated ? (
                            <div className="user-menu">
                                <span className="user-name">{user?.name}</span>
                                <Button variant="ghost" size="sm" onClick={logout}>
                                    Выйти
                                </Button>
                            </div>
                        ) : (
                            <Link to="/crm">
                                <Button variant="primary" size="sm">
                                    Войти
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
