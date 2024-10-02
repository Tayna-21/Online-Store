import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { keepShipmentData } from '../store/FormSlice.ts';
import { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { validationSchemaShipment } from '../utilities';
import Button from '../components/Button/index.tsx';
import Input from '../components/Input/index.tsx';
import Select from '../components/Select/index.tsx';
import Breadcrumbs from '../components/Breadcrumbs/index.tsx';
import selectJson from '../assets/data.json';

const ShipmentPage: React.FC = () => {
    const [countries, setCountries] = useState<string[]>([])
    const [states, setStates] = useState<string[]>([])
    const shipmentFormState = useSelector((state: RootState) => state.form.shipmentForm);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    useEffect(() => {
        const optionsCountries = selectJson.map(item => item.countryName);

        const optionsStates = selectJson.map(item => item.states).flat();

        setStates(optionsStates);

        setCountries(optionsCountries);
    }, []);

    return (
        <>  
            <Breadcrumbs />
            <h1>Shipment Information</h1>
            <Formik
                initialValues={{
                    address: shipmentFormState.address,
                    apartment: shipmentFormState.apartment,
                    city: shipmentFormState.city,
                    country: shipmentFormState.country,
                    state: shipmentFormState.state,
                    zipCode: shipmentFormState.zipCode
                }}
                validationSchema={validationSchemaShipment}
                onSubmit={(values) => {

                    dispatch(keepShipmentData(values));

                    navigate('/confirmation', { state: values});
                }}
                validateOnBlur
            >
                {({isValid, touched, errors}) => {
                    return (
                        <Form>
                            <div className="shipment-form-field">
                                <Input
                                    id="address"
                                    label="Address(no p.o. boxes)*"
                                    type="text"
                                    name="address"
                                    placeholder="Enter your address"
                                    className={ touched.address && errors.address ? 'invalid' : ''}
                                    required={true}
                                />
                                <Input
                                    id="apartment"
                                    label="Apartment, suite etc. (optional)"
                                    type="text"
                                    name="apartment"
                                    placeholder="Enter your apartment information"
                                />
                                <Input
                                    id="city"
                                    label="City*"
                                    type="text"
                                    name="city"
                                    placeholder="Enter your city"
                                    className={ touched.city && errors.city ? 'invalid' : ''}
                                    required={true}
                                />
                                <div className="selects">
                                    <Select 
                                        label={"Country/region"} 
                                        idSelect={"country"}
                                        name={"country"}
                                        listOfOptions={countries} 
                                        className={ touched.country && errors.country ? 'invalid' : ''}
                                        defaultOption="Select your country/region"
                                    />
                                    <Select
                                        label={"State"} 
                                        idSelect={"state"}
                                        name={"state"}
                                        listOfOptions={states}
                                        className={ touched.state && errors.state ? 'invalid' : ''}
                                        defaultOption="Select your state"
                                    />
                                    <Input
                                        id="zip-code"
                                        label="ZIP code*"
                                        type="text"
                                        name="zipCode"
                                        placeholder="Enter your ZIP code"
                                        className={ touched.city && errors.city ? 'invalid' : ''}
                                        required={true}
                                    />   
                                </div>
                            </div>
                            <Button
                                title="Submit order"
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

export default ShipmentPage;
