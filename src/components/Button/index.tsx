import React from 'react';
import { ButtonProps } from '../../interfaces';

const Button: React.FC<ButtonProps> = ({
    type,
    title,
    icon,
    className,
    disabled,
    value,
    onClick,
    style
}) => {

    return (
        <button type={type} className={className} disabled={disabled} value={value} onClick={onClick} style={style}>
            {icon}{title}
        </button>
    )
};

export default Button;
