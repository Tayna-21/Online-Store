import React from 'react';
import { InputProps } from '../../interfaces';
import {Field, ErrorMessage} from 'formik';

const Input: React.FC<InputProps> = ({id, label, type, name, placeholder, className}) => {
    return (
        <div className="form-input-field">
            <label htmlFor={id}>{label}</label>
            <Field type={type} id={id} name={name} placeholder={placeholder} className={className} autoComplete="off"/>
            <ErrorMessage className="error-message" name={name} component="span"/>
        </div>
    )
};

export default Input;
