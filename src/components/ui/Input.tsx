import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
        const wrapperClasses = ['input-wrapper', fullWidth ? 'input-full' : '']
            .filter(Boolean)
            .join(' ');

        const inputClasses = ['input', error ? 'input-error' : '', className]
            .filter(Boolean)
            .join(' ');

        return (
            <div className={wrapperClasses}>
                {label && <label className="input-label">{label}</label>}
                <input ref={ref} className={inputClasses} {...props} />
                {error && <span className="input-error-text">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
