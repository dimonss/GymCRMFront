import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import type { SportType } from '@/types';
import './ApplicationForm.css';

export const ApplicationForm: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        clubName: '',
        contactName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        sportTypes: [] as SportType[],
        membersCount: '',
        description: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const sportOptions: Array<{ value: SportType; label: string }> = [
        { value: 'fitness', label: 'Фитнес' },
        { value: 'boxing', label: 'Бокс' },
        { value: 'yoga', label: 'Йога' },
        { value: 'swimming', label: 'Плавание' },
        { value: 'martial_arts', label: 'Единоборства' },
        { value: 'crossfit', label: 'Кроссфит' },
        { value: 'tennis', label: 'Теннис' },
        { value: 'basketball', label: 'Баскетбол' },
    ];

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (currentStep === 1) {
            if (!formData.clubName) newErrors.clubName = 'Введите название клуба';
            if (!formData.contactName) newErrors.contactName = 'Введите контактное лицо';
            if (!formData.email) newErrors.email = 'Введите email';
            if (!formData.phone) newErrors.phone = 'Введите телефон';
        }

        if (currentStep === 2) {
            if (!formData.city) newErrors.city = 'Введите город';
            if (!formData.address) newErrors.address = 'Введите адрес';
            if (formData.sportTypes.length === 0) newErrors.sportTypes = 'Выберите хотя бы один вид спорта';
        }

        if (currentStep === 3) {
            if (!formData.membersCount) newErrors.membersCount = 'Введите количество членов';
            if (!formData.description) newErrors.description = 'Введите описание';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        if (!validateStep(step)) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);

        // Redirect after 2 seconds
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    const toggleSportType = (sport: SportType) => {
        setFormData(prev => ({
            ...prev,
            sportTypes: prev.sportTypes.includes(sport)
                ? prev.sportTypes.filter(s => s !== sport)
                : [...prev.sportTypes, sport],
        }));
    };

    if (isSuccess) {
        return (
            <div className="application-form">
                <div className="container">
                    <Card className="success-card scale-in">
                        <div className="success-icon">✅</div>
                        <h2>Заявка успешно отправлена!</h2>
                        <p>Мы свяжемся с вами в ближайшее время.</p>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="application-form">
            <div className="container">
                <div className="form-header slide-down">
                    <h1>Заявка на подключение</h1>
                    <p>Заполните форму, чтобы начать использовать GymCRM</p>
                </div>

                <div className="progress-bar slide-up">
                    <div className="progress-step">
                        <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
                        <span>Контакты</span>
                    </div>
                    <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
                    <div className="progress-step">
                        <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
                        <span>Информация</span>
                    </div>
                    <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
                    <div className="progress-step">
                        <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
                        <span>Детали</span>
                    </div>
                </div>

                <Card className="form-card scale-in">
                    {step === 1 && (
                        <div className="form-step">
                            <h3>Контактная информация</h3>
                            <Input
                                label="Название клуба"
                                value={formData.clubName}
                                onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                                error={errors.clubName}
                                fullWidth
                            />
                            <Input
                                label="Контактное лицо"
                                value={formData.contactName}
                                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                error={errors.contactName}
                                fullWidth
                            />
                            <Input
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                error={errors.email}
                                fullWidth
                            />
                            <Input
                                label="Телефон"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                error={errors.phone}
                                fullWidth
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="form-step">
                            <h3>Информация о клубе</h3>
                            <Input
                                label="Город"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                error={errors.city}
                                fullWidth
                            />
                            <Input
                                label="Адрес"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                error={errors.address}
                                fullWidth
                            />

                            <div className="sport-selection">
                                <label className="input-label">Виды спорта</label>
                                <div className="sport-options">
                                    {sportOptions.map((sport) => (
                                        <button
                                            key={sport.value}
                                            type="button"
                                            className={`sport-option ${formData.sportTypes.includes(sport.value) ? 'selected' : ''}`}
                                            onClick={() => toggleSportType(sport.value)}
                                        >
                                            {sport.label}
                                        </button>
                                    ))}
                                </div>
                                {errors.sportTypes && <span className="input-error-text">{errors.sportTypes}</span>}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="form-step">
                            <h3>Дополнительная информация</h3>
                            <Input
                                label="Количество членов клуба"
                                type="number"
                                value={formData.membersCount}
                                onChange={(e) => setFormData({ ...formData, membersCount: e.target.value })}
                                error={errors.membersCount}
                                fullWidth
                            />

                            <div className="input-wrapper">
                                <label className="input-label">Описание клуба</label>
                                <textarea
                                    className="textarea"
                                    rows={5}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Расскажите о вашем клубе..."
                                />
                                {errors.description && <span className="input-error-text">{errors.description}</span>}
                            </div>
                        </div>
                    )}

                    <div className="form-actions">
                        {step > 1 && (
                            <Button variant="ghost" onClick={handleBack}>
                                Назад
                            </Button>
                        )}
                        {step < 3 ? (
                            <Button variant="primary" onClick={handleNext}>
                                Далее
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
                                Отправить заявку
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};
