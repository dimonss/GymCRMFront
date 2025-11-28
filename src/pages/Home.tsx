import { useState } from 'react';
import { mockClubs } from '../data/mockClubs';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import type { SportType } from '@/types';
import './Home.css';

export const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');

    const filteredClubs = mockClubs.filter((club) => {
        const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.location.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSport = selectedSport === 'all' || club.sportTypes.includes(selectedSport);
        return matchesSearch && matchesSport;
    });

    const sportTypes: Array<{ value: SportType | 'all'; label: string }> = [
        { value: 'all', label: 'Все виды спорта' },
        { value: 'fitness', label: 'Фитнес' },
        { value: 'boxing', label: 'Бокс' },
        { value: 'yoga', label: 'Йога' },
        { value: 'swimming', label: 'Плавание' },
        { value: 'martial_arts', label: 'Единоборства' },
        { value: 'crossfit', label: 'Кроссфит' },
        { value: 'tennis', label: 'Теннис' },
        { value: 'basketball', label: 'Баскетбол' },
    ];

    return (
        <div className="home">
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title slide-up">
                        Современная CRM для спортивных клубов
                    </h1>
                    <p className="hero-subtitle slide-up stagger-1">
                        Управляйте вашим клубом эффективно с помощью нашей платформы
                    </p>
                </div>
            </section>

            <section className="clubs-section">
                <div className="container">
                    <div className="filters slide-up stagger-2">
                        <Input
                            type="text"
                            placeholder="Поиск по названию или городу..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            fullWidth
                        />

                        <div className="sport-filters">
                            {sportTypes.map((sport) => (
                                <button
                                    key={sport.value}
                                    className={`sport-filter ${selectedSport === sport.value ? 'active' : ''}`}
                                    onClick={() => setSelectedSport(sport.value)}
                                >
                                    {sport.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="clubs-grid">
                        {filteredClubs.map((club, index) => (
                            <Card key={club.id} hover className={`club-card slide-up stagger-${Math.min(index % 4 + 1, 5)}`}>
                                <div className="club-logo">{club.logo}</div>
                                <h3 className="club-name">{club.name}</h3>
                                <p className="club-description">{club.description}</p>

                                <div className="club-info">
                                    <div className="info-item">
                                        <span className="info-icon">📍</span>
                                        <span>{club.location.city}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-icon">👥</span>
                                        <span>{club.membersCount} членов</span>
                                    </div>
                                </div>

                                <div className="club-sports">
                                    {club.sportTypes.map((sport) => (
                                        <span key={sport} className="sport-tag">
                                            {sportTypes.find(s => s.value === sport)?.label || sport}
                                        </span>
                                    ))}
                                </div>

                                <div className="club-footer">
                                    <span className={`status-badge status-${club.status}`}>
                                        {club.status === 'active' ? 'Активен' : 'Неактивен'}
                                    </span>
                                    <span className="join-date">
                                        С {new Date(club.joinedDate).toLocaleDateString('ru-RU')}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredClubs.length === 0 && (
                        <div className="no-results">
                            <p>Клубы не найдены. Попробуйте изменить параметры поиска.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
