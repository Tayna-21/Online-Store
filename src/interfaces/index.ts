import React, { ReactNode, CSSProperties } from 'react';

export interface shopData {
  id: number,
  images: string[],
  description: string,
  price: number,
  [key: string]: string[] | string | number ,
}

export type Product = {
  id: string,
  image: string,
  description: string,
  price: number,
  quantity: number
}

export interface ProductProps extends Product {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface HeaderProps {
  amountOfAddedProducts?: number | null
}

export interface ButtonProps {
  type: 'button' | 'submit',
  className?: string,
  icon?: ReactNode,
  title?: string,
  pressed?: boolean,
  disabled?: boolean,
  value?: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  style?: CSSProperties
}

export interface InputProps {
  className?: string | null,
  id: string,
  label: string,
  name: string,
  placeholder: string,
  required?: boolean,
  type: string
}

export interface SelectProps {
  idSelect: string,
  name: string,
  label: string,
  listOfOptions: string[],
  className: string,
  defaultOption: string,
}

//interfaces used for initial states and actions in store

export interface Cart {
  cart: Product[],
  totalPrice: string
}

export interface ProductQuantityUpdating {
  id: string,
  actionValue: string
}

export interface ContactForm {
  firstName: string,
  lastName: string,
  email: string,
  phone: string
}

export interface ShipmentForm {
  address: string,
  apartment: string,
  city: string,
  country: string,
  state: string,
  zipCode: string
}

export interface Form {
  contactForm: ContactForm,
  shipmentForm: ShipmentForm
}
