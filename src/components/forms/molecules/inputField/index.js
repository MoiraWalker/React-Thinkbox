import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label, Input, ErrorMessage } from '../../atoms';
import './index.scss';

export const InputField = ({ label, name, fieldRef, type = 'text' }) => {
    const { errors } = useFormContext();
    return (
        <div>
            <Label name={name}>{label}</Label>
            <Input type={type} fieldRef={fieldRef} name={name} />
            {errors[name] && (
                <ErrorMessage>{errors[name].message || 'Error'}</ErrorMessage>
            )}
        </div>
    );
};