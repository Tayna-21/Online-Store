import React from 'react';
import { SelectProps } from '../../interfaces';
import { Field, ErrorMessage } from 'formik';

const Select: React.FC<SelectProps> = ({idSelect, name, label, listOfOptions, className, defaultOption}) => {
    return (
		<div className="form-input-field">
            <label htmlFor={idSelect}>{label}*</label>
            <Field as="select" id={idSelect} name={name} className={className} required autoComplete="off">
				<option defaultValue="">{defaultOption}</option>
				{listOfOptions && listOfOptions.map((optionName, index) => (
					<option value={optionName} key={index}>{optionName}</option>
				))}
			</Field>
            <ErrorMessage className="error-message" name={name} component="span"/>
        </div>
	)
}

export default Select;