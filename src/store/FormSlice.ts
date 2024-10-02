import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialFormState} from "../utilities";
import {ContactForm, ShipmentForm} from '../interfaces';

const initialState = initialFormState;

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        keepContactsData(state, action: PayloadAction<ContactForm>) {
            const contactsData = action.payload;

            return {
                ...state,
                contactForm: {
                    ...state,
                    firstName: contactsData.firstName,
                    lastName: contactsData.lastName,
                    email: contactsData.email,
                    phone: contactsData.phone
                }
            }
        },
        keepShipmentData(state, action: PayloadAction<ShipmentForm>) {
            const shipmentData = action.payload;
            
            return {
                ...state,
                shipmentForm: {
                    ...state,
                    address: shipmentData.address,
                    apartment: shipmentData.apartment,
                    city: shipmentData.city,
                    country: shipmentData.country,
                    state: shipmentData.state,
                    zipCode: shipmentData.zipCode
                }
            }
        }
    },
});

export const { keepContactsData, keepShipmentData } = formSlice.actions;
export default formSlice.reducer;