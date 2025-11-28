import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4 className="gradient-text">GymCRM</h4>
                        <p>Современная CRM система для управления спортивными клубами</p>
                    </div>

                    <div className="footer-section">
                        <h5>Контакты</h5>
                        <p>Email: info@gymcrm.ru</p>
                        <p>Телефон: +7 (800) 555-35-35</p>
                    </div>

                    <div className="footer-section">
                        <h5>Ссылки</h5>
                        <a href="#">О нас</a>
                        <a href="#">Документация</a>
                        <a href="#">Поддержка</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 GymCRM. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};
