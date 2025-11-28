import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { mockApplications } from '../data/mockApplications';
import './AdminPanel.css';

export const AdminPanel: React.FC = () => {
    const { user, isAuthenticated, login } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState(mockApplications);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated || user?.role !== 'super_admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setIsLoggingIn(true);

        const success = await login(email, password);

        setIsLoggingIn(false);

        if (success && user?.role === 'super_admin') {
            setShowLoginModal(false);
        } else {
            setLoginError('Неверные данные или недостаточно прав. Попробуйте: admin@gymcrm.ru / password');
        }
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
        navigate('/');
    };

    const handleApprove = (id: string) => {
        setApplications(apps =>
            apps.map(app =>
                app.id === id
                    ? { ...app, status: 'approved', reviewedDate: new Date().toISOString(), reviewedBy: user?.name || 'Администратор' }
                    : app
            )
        );
    };

    const handleReject = (id: string) => {
        const reason = prompt('Причина отклонения:');
        if (reason) {
            setApplications(apps =>
                apps.map(app =>
                    app.id === id
                        ? { ...app, status: 'rejected', reviewedDate: new Date().toISOString(), reviewedBy: user?.name || 'Администратор', rejectionReason: reason }
                        : app
                )
            );
        }
    };

    const filteredApplications = applications.filter(app =>
        filter === 'all' || app.status === filter
    );

    if (!isAuthenticated || user?.role !== 'super_admin') {
        return (
            <Modal isOpen={showLoginModal} onClose={handleCloseModal} title="Вход в админ панель">
                <form onSubmit={handleLogin} className="login-form">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@gymcrm.ru"
                        fullWidth
                    />
                    <Input
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        fullWidth
                    />
                    {loginError && <p className="error-message">{loginError}</p>}
                    <Button type="submit" variant="primary" fullWidth isLoading={isLoggingIn}>
                        Войти
                    </Button>
                    <p className="hint-text">
                        Подсказка: admin@gymcrm.ru / password
                    </p>
                </form>
            </Modal>
        );
    }

    return (
        <div className="admin-panel">
            <div className="container">
                <div className="admin-header slide-down">
                    <h1>Админ панель</h1>
                    <p>Управление заявками от спортивных клубов</p>
                </div>

                <div className="filters-bar slide-up">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        Все ({applications.length})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                        onClick={() => setFilter('pending')}
                    >
                        Ожидают ({applications.filter(a => a.status === 'pending').length})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
                        onClick={() => setFilter('approved')}
                    >
                        Одобрены ({applications.filter(a => a.status === 'approved').length})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
                        onClick={() => setFilter('rejected')}
                    >
                        Отклонены ({applications.filter(a => a.status === 'rejected').length})
                    </button>
                </div>

                <div className="applications-grid">
                    {filteredApplications.map((app, index) => (
                        <Card key={app.id} className={`application-card slide-up stagger-${Math.min(index % 3 + 1, 5)}`}>
                            <div className="app-header">
                                <h3>{app.clubName}</h3>
                                <span className={`status-badge status-${app.status}`}>
                                    {app.status === 'pending' ? 'Ожидает' :
                                        app.status === 'approved' ? 'Одобрено' : 'Отклонено'}
                                </span>
                            </div>

                            <div className="app-info">
                                <div className="info-row">
                                    <span className="label">Контакт:</span>
                                    <span>{app.contactPerson.name}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Email:</span>
                                    <span>{app.contactPerson.email}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Телефон:</span>
                                    <span>{app.contactPerson.phone}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Город:</span>
                                    <span>{app.location.city}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Членов:</span>
                                    <span>{app.membersCount}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Подано:</span>
                                    <span>{new Date(app.submittedDate).toLocaleDateString('ru-RU')}</span>
                                </div>
                            </div>

                            <p className="app-description">{app.description}</p>

                            <div className="app-sports">
                                {app.sportTypes.map(sport => (
                                    <span key={sport} className="sport-tag">{sport}</span>
                                ))}
                            </div>

                            {app.status === 'pending' && (
                                <div className="app-actions">
                                    <Button variant="primary" size="sm" onClick={() => handleApprove(app.id)}>
                                        Одобрить
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleReject(app.id)}>
                                        Отклонить
                                    </Button>
                                </div>
                            )}

                            {app.status !== 'pending' && (
                                <div className="app-review">
                                    <p className="review-info">
                                        Рассмотрено {new Date(app.reviewedDate!).toLocaleDateString('ru-RU')} ({app.reviewedBy})
                                    </p>
                                    {app.rejectionReason && (
                                        <p className="rejection-reason">Причина: {app.rejectionReason}</p>
                                    )}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

                {filteredApplications.length === 0 && (
                    <div className="no-results">
                        <p>Заявки не найдены</p>
                    </div>
                )}
            </div>
        </div>
    );
};
