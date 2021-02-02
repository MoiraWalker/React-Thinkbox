import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label, Input, ErrorMessage } from '../../atoms';
import './index.scss';

export const InputField = ({ label, name, fieldRef, value, type = 'text', onChange, className }) => {
    const { errors } = useFormContext();
    return (
        <div>
            <Label name={name} className={className}>{label}</Label>
            <Input type={type} fieldRef={fieldRef} value={value} name={name} onChange={onChange} />
            {errors[name] && (
                <ErrorMessage>{errors[name].message || 'Error'}</ErrorMessage>
            )}
        </div>
    );
};
