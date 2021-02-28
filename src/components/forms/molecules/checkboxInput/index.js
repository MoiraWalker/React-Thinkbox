import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '../../atoms';
import './index.scss';

export const CheckboxInput = ({label, name, id, fieldRef}) => {
    const { errors } = useFormContext();
    return (
        <div>
            <div className="select-box">
                <input ref={fieldRef} type="checkbox" name={name} id={id} />
                <label className="select-box-label" htmlFor={id} name={name}>{label}</label>
            </div>
            {errors[name] && (
                <ErrorMessage>{errors[name].message || "Error"}</ErrorMessage>
            )}
        </div>
    );
}
