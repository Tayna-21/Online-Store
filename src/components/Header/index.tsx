import React from 'react';
import { HeaderProps} from "../../interfaces";
import { Link } from 'react-router-dom';
import CartIcon from '../Icons/CartIcon.tsx';

const Header: React.FC<HeaderProps> = ({amountOfAddedProducts}) => {
    return (
        <header className="header">
          <div className="header-container">
            <div className="content">
              <strong>
                <Link to="/" className="home">
                  <div className="logo">
                    <div className="square bright"></div>
                    <div className="square dark"></div>
                  </div>
                  <span>OnlineStore</span>
                </Link>
              </strong>
              <Link to='/cart' className="cart-button" role="button">
                <CartIcon />
                Cart
                { amountOfAddedProducts && <div className="amount"><span>{amountOfAddedProducts}</span></div> }
              </Link>
            </div>
          </div>
        </header>
    )
}

export default Header;
