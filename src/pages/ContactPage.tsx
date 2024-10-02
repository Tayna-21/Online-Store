import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { keepContactsData } from '../store/FormSlice.ts';
import { AppDispatch, RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { validationSchemaContacts } from '../utilities';
import Button from '../components/Button/index.tsx';
import Input from '../components/Input/index.tsx';
import Breadcrumbs from '../components/Breadcrumbs/index.tsx';

const ContactPage: React.FC = () => {
    const formState = useSelector((state: RootState) => state.form.contactForm);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return (
        <>
            <Breadcrumbs />
            <h1>Contact Information</h1>
            <Formik
                initialValues={{ 
                    firstName: formState.firstName, 
                    lastName: formState.lastName, 
                    email: formState.email, 
                    phone: formState.phone 
                }}
                validationSchema={validationSchemaContacts}
                onSubmit={(values) => {

                    dispatch(keepContactsData(values));

                    navigate('/shipment', { state: values });
                }}
                validateOnBlur
            >
                {({isValid, touched, errors}) => {
                    return (
                        <Form>
                            <div className="contact-form-field">
                                <Input
                                    id="first-name"
                                    label="First name*"
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    className={ touched.firstName && errors.firstName ? 'invalid' : ''}
                                    required={true}
                                />
                                <Input
                                    id="last-name"
                                    label="Last name*"
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    className={ touched.lastName && errors.lastName ? 'invalid' : '' }
                                    required={true}
                                />
                                <Input
                                    id="email"
                                    label="Email*"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className={ touched.email && errors.email ? 'invalid' : ''}
                                    required={true}
                                />
                                <Input
                                    id="phone"
                                    label="Phone*"
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone"
                                    className={ touched.phone && errors.phone ? 'invalid' : '' }
                                    required={true}
                                />
                            </div>
                            <Button
                                title="Next step"
                                type="submit"
                                className="next-step-button"
                                disabled={!isValid}
                            />
                        </Form>
                    );
                }}
            </Formik>
        </>
    )
}

export default ContactPage;
