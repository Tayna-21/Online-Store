import { Cart, Form } from '../interfaces';
import * as Yup from 'yup';
import { regex } from '../constants';

export const initialProductState: Cart = {
    cart: [],
    totalPrice: ''
};

export const initialFormState: Form = {
    contactForm: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    },
    shipmentForm: {
        address: '',
        apartment: '',
        city: '',
        country: '',
        state: '',
        zipCode: ''
    }
}

export const validationSchemaContacts = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Name is too short')
        .matches(regex.contacts.name, 'You can use letters only')
        .required('This field is required'),
    lastName: Yup.string()
        .min(2, 'Last name is too short')
        .matches(regex.contacts.name, 'You can use letters only')
        .required('This field is required'),
    email: Yup.string()
        .matches(regex.contacts.email, 'Email address is not valid')
        .required('This field is required'),
    phone: Yup.string()
        .min(9, 'Phone number is too short')
        .max(14, 'Phone number is too long')
        .matches(regex.contacts.phone, 'You can use numbers only')
        .required('This field is required'),
})

export const validationSchemaShipment = Yup.object().shape({
    address: Yup.string()
        .matches(regex.shipment.address, 'Address is not valid')
        .required('This field is required'),
    city: Yup.string()
        .min(3, 'Too short')
        .max(20, 'Too long')
        .matches(regex.shipment.city, 'You can use letters, apostroph and dot only')
        .required('This field is required'),
    country: Yup.string()
        .required('This field is required'),
    state: Yup.string()
        .required('This field is required'),
    zipCode: Yup.string()
         .matches(regex.shipment.zipCode, 'ZIP code is not valid')
        .required('This field is required')
})