import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import './Header.css';

export const Header: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header glass">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo" onClick={closeMenu}>
                        <span className="logo-icon">💪</span>
                        <span className="logo-text gradient-text">GymCRM</span>
                    </Link>

                    <button
                        className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Меню"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="/" className="nav-link" onClick={closeMenu}>
                            Главная
                        </Link>
                        <Link to="/application" className="nav-link" onClick={closeMenu}>
                            Подать заявку
                        </Link>
                        {isAuthenticated && user?.role === 'club_admin' && (
                            <Link to="/crm" className="nav-link" onClick={closeMenu}>
                                CRM
                            </Link>
                        )}
                        {isAuthenticated && user?.role === 'super_admin' && (
                            <Link to="/admin" className="nav-link" onClick={closeMenu}>
                                Админка
                            </Link>
                        )}

                        {/* Mobile only actions */}
                        <div className="mobile-actions">
                            {isAuthenticated ? (
                                <>
                                    <div className="user-info">
                                        <span className="user-name-mobile">{user?.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => { logout(); closeMenu(); }}>
                                        Выйти
                                    </Button>
                                </>
                            ) : (
                                <Link to="/crm" onClick={closeMenu}>
                                    <Button variant="primary" size="sm">
                                        Войти
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </nav>

                    <div className="header-actions desktop-only">
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
