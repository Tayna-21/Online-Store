import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { MONTHS } from '../constants';
import { countGrandTotalPrice } from '../functions';
import CheckedIcon from '../components/Icons/CheckedIcon';
import PersonIcon from '../components/Icons/PersonIcon';
import CarIcon from '../components/Icons/CarIcon';
import InfoIcon from '../components/Icons/InfoIcon';
import Button from '../components/Button';

const ConfirmationPage: React.FC = () => {
    const date = new Date();
    const day = date.getDate();
    const monthNumber = date.getMonth() + 1;
    const monthName = MONTHS[date.getMonth()].slice(0, 3);
    const year = date.getFullYear();
    const currentDate = `${day} ${monthName} ${year}`;
    const contacts = useSelector((state: RootState) => state.form.contactForm);
    const shipmentInfo = useSelector((state: RootState) => state.form.shipmentForm);
    const cartStateInStore = useSelector((state: RootState) => state.shop.cart);
    const subTotalPrice = (useSelector((state: RootState) => state.shop.totalPrice));
    const subTotalPriceNumber = parseFloat(subTotalPrice); 
    const navigate = useNavigate();
    // data from server
    const orderNumber = '000000003';
    const orderStatus = 'pending';
    const shipmentPrice = 0.0;
    const taxes = 0;

    const grandTotalPrice = useMemo(() => countGrandTotalPrice(subTotalPriceNumber, shipmentPrice, taxes), [subTotalPriceNumber, shipmentPrice, taxes]);

    const moveAhead = (): void => {
        navigate('/', { state: '/confirmation' });
    };
    
    return (
        <>  
            <div className='confirmation-details'>
                <div className="icons-background">
                    <CheckedIcon />
                </div>
                <h1>Thank you for your order!</h1>
                <strong className='confirmation-message'>The order confirmation email with details of your order and a 
                    link to track its progress has been sent to your email address.</strong>
                <p className='order-number'>Your order # is <strong>{orderNumber}- {orderStatus.toUpperCase()}</strong></p>
                <p className='order-date'>Order Date: 
                    <time dateTime={`${year}-${String(monthNumber).padStart(2, '0')}-${day}`}>{currentDate}</time>
                </p>
            </div>
            <div className='order-and-personal-data'>
                <div className='contacts-data background'>
                    <div className='title'>
                        <PersonIcon />
                        <h6>Contact information</h6>
                    </div>
                    <p>{contacts.firstName} {contacts.lastName}</p>
                    <p>{contacts.email}</p>
                    <p>{contacts.phone}</p>
                </div>
                <div className='shipment-data background'>
                    <div className='title'>
                        <CarIcon />
                        <h6>Shipment information</h6>
                    </div>
                    <p>{shipmentInfo.address}, {shipmentInfo.apartment}</p>
                    <p>{shipmentInfo.city}, {shipmentInfo.state}, {shipmentInfo.zipCode}</p>
                    <p>{shipmentInfo.country}</p>
                </div>
                <div className='order-summary background'>
                    <div className='title'>
                        <InfoIcon />
                        <h6>Order summary</h6>
                    </div>
                    <ul className='order-products'>
                        {cartStateInStore && cartStateInStore.map((item, index) => 
                            <li key={index}>
                                <div className='order-product-image' 
                                    style={{background: `url("${item.image}") center center/contain no-repeat`}}></div>
                                <strong className='order-product-description'>{item.description}</strong>
                                <p className='order-product-price-quantity'>${item.price}, {item.quantity} { item.quantity > 1 ? 'products' : 'product' }</p>
                            </li>
                        )}
                    </ul>
                    <div className='prices'>
                        <h6>Subtotal:</h6>
                        <p>${subTotalPrice}</p>
                        <h6>Shipping&Handling:</h6>
                        <p>${shipmentPrice.toFixed(2)}</p>
                        <h6>Tax:</h6>
                        <p>${taxes.toFixed(2)}</p>
                        <h6 className='grand-total-price'>Grand Total:</h6>
                        <p className='grand-total-price'>${grandTotalPrice}</p>
                    </div>
                </div>
            </div>
            <Button 
                type="button"
                title="Continue shopping"
                className="next-step-button"
                onClick={moveAhead}
            />
        </>
    )
}

export default ConfirmationPage;
