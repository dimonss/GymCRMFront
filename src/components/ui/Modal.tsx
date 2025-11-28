import React, { ReactNode, useEffect } from 'react';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content scale-in" onClick={(e) => e.stopPropagation()}>
                {title && (
                    <div className="modal-header">
                        <h3>{title}</h3>
                        <button className="modal-close" onClick={onClose}>
                            ✕
                        </button>
                    </div>
                )}
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};
