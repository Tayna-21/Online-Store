export const regex = {
    contacts: {
        name: /^[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+){0,2}[.]{0,1}$/,
        email: /^[a-zA-Z0-9.!_]+@[a-zA-Z]+[.]+([a-zA-Z]+)*$/,
        phone: /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{9,14})$/,
    },   
    shipment: {
        address: /^(?!.*\b(?:P\.?\s?O\.?|Post\sOffice)\s?Box\b)[A-Za-z0-9\s,.'-]{3,20}$/,
        city: /^[A-Za-z\s\-'.]{2,100}$/,
        zipCode: /^\d{5}(-\d{4})?$|^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$|^\d{5}$/
    }
}

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];