import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Breadcrumbs: React.FC = () => {
    const isCart = useSelector((state: RootState) => state.shop.cart);
    const isForm = useSelector((state: RootState) => state.form.contactForm);
    const isFormSubmitted = !Object.values(isForm).some(value => value === '');
    const breadcrumbs = [
        {
          title: 'Cart',
          path: '/cart',
        },
        {
          title: 'Contact Information',
          path: '/contact',
        },
        {
          title: 'Shipment information',
          path: '/shipment' ,
        },
    ];

    const navigateBreadcrumbs = (event: React.MouseEvent<HTMLAnchorElement>, path: string): void => {
        if (isCart.length === 0 || (!isFormSubmitted && path === '/shipment')) {
            event.preventDefault();
        } 
    }

    return (
        <ul className='breadcrumbs'>
            { breadcrumbs && breadcrumbs.map((item, index) =>
                <li key={index}>
                    <NavLink
                        to={item.path}
                        className={({isActive}) =>
                        isActive ? "active" : "" }
                        onClick={(event) => navigateBreadcrumbs(event, item.path)}>
                        {item.title}
                    </NavLink>
                </li>
            )}
       </ul>
    )
};

export default Breadcrumbs;
