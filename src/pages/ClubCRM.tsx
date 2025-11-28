import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { mockMembers, mockSessions, mockClubStats } from '../data/mockCRMData';
import './ClubCRM.css';

export const ClubCRM: React.FC = () => {
    const { user, isAuthenticated, login } = useAuth();
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || user?.role === 'guest') {
            setShowLoginModal(true);
        }
    }, [isAuthenticated, user]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setIsLoggingIn(true);

        const success = await login(email, password);

        setIsLoggingIn(false);

        if (success) {
            setShowLoginModal(false);
        } else {
            setLoginError('Неверный email или пароль. Попробуйте: club@titan.ru / password');
        }
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
        navigate('/');
    };

    if (!isAuthenticated || user?.role === 'guest') {
        return (
            <Modal isOpen={showLoginModal} onClose={handleCloseModal} title="Вход в CRM">
                <form onSubmit={handleLogin} className="login-form">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="club@titan.ru"
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
                        Подсказка: club@titan.ru / password или admin@gymcrm.ru / password
                    </p>
                </form>
            </Modal>
        );
    }

    return (
        <div className="club-crm">
            <div className="container">
                <div className="crm-header slide-down">
                    <h1>CRM Dashboard</h1>
                    <p>Добро пожаловать, {user?.name}</p>
                </div>

                <div className="stats-grid">
                    <Card className="stat-card slide-up stagger-1">
                        <div className="stat-icon">👥</div>
                        <div className="stat-content">
                            <h3>{mockClubStats.totalMembers}</h3>
                            <p>Всего членов</p>
                        </div>
                    </Card>

                    <Card className="stat-card slide-up stagger-2">
                        <div className="stat-icon">✅</div>
                        <div className="stat-content">
                            <h3>{mockClubStats.activeMembers}</h3>
                            <p>Активных</p>
                        </div>
                    </Card>

                    <Card className="stat-card slide-up stagger-3">
                        <div className="stat-icon">💰</div>
                        <div className="stat-content">
                            <h3>{mockClubStats.revenue.toLocaleString('ru-RU')} ₽</h3>
                            <p>Доход</p>
                        </div>
                    </Card>

                    <Card className="stat-card slide-up stagger-4">
                        <div className="stat-icon">📈</div>
                        <div className="stat-content">
                            <h3>+{mockClubStats.membershipGrowth}%</h3>
                            <p>Рост</p>
                        </div>
                    </Card>
                </div>

                <div className="crm-content">
                    <Card className="members-section slide-up">
                        <h2>Члены клуба</h2>
                        <div className="members-table">
                            <div className="table-header">
                                <span>Имя</span>
                                <span>Email</span>
                                <span>Тип</span>
                                <span>Статус</span>
                            </div>
                            {mockMembers.map((member) => (
                                <div key={member.id} className="table-row">
                                    <span>{member.name}</span>
                                    <span className="email">{member.email}</span>
                                    <span className={`membership-type type-${member.membershipType}`}>
                                        {member.membershipType === 'basic' ? 'Базовый' :
                                            member.membershipType === 'premium' ? 'Премиум' : 'VIP'}
                                    </span>
                                    <span className={`status status-${member.status}`}>
                                        {member.status === 'active' ? 'Активен' :
                                            member.status === 'expired' ? 'Истёк' : 'Приостановлен'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="sessions-section slide-up stagger-1">
                        <h2>Ближайшие тренировки</h2>
                        <div className="sessions-list">
                            {mockSessions.map((session) => (
                                <div key={session.id} className="session-card">
                                    <div className="session-header">
                                        <h4>{session.title}</h4>
                                        <span className="session-capacity">
                                            {session.enrolled}/{session.capacity}
                                        </span>
                                    </div>
                                    <div className="session-details">
                                        <span>👤 {session.trainer}</span>
                                        <span>📅 {new Date(session.date).toLocaleDateString('ru-RU')}</span>
                                        <span>⏰ {session.time}</span>
                                        <span>⏱️ {session.duration} мин</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
