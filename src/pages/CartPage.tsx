import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { updateTotalPrice } from '../store/CartSlice.ts';
import { RootState, AppDispatch } from '../store';
import { countTotalQuantity, countTotalPrice } from '../functions/index.ts';
import CartPageStoreItem from '../components/CartPageStoreItem/index.tsx';
import Button from '../components/Button/index.tsx';
import Breadcrumbs from '../components/Breadcrumbs/index.tsx';

const CartPage: React.FC = () => {
    const cartStateInStore = useSelector((state: RootState) => state.shop.cart);
    const [cartInStorage, setCartInStorage] = useLocalStorage('productsInStorage', cartStateInStore);
    const cart = ( cartStateInStore.length > 0 ? cartStateInStore : cartInStorage );
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
       setCartInStorage(cartStateInStore);
    }, [cartStateInStore]);

    const totalQuantity = useMemo(() => countTotalQuantity(cart), [cart]);
    const totalPrice = useMemo(() => countTotalPrice(cart), [cart]);
    
    useEffect(() => {
        dispatch(updateTotalPrice(totalPrice));
    }, [totalPrice]);

    const moveAhead = (): void => {
        navigate('/contact');
    };

    return (
        <>
            <Breadcrumbs />
            <h1>Cart</h1>
            <ul className='cart-list-products'>
                { cart && cart.map((item, index) =>
                    <CartPageStoreItem
                        key={index}
                        id={item.id}
                        image={item.image}
                        description={item.description}
                        price={item.price}
                        quantity={item.quantity}
                    />
                ) }
            </ul>
            <div className="total-amount-and-price">
                <p>Together:</p>
                <p className="total-value">{totalQuantity} products</p>
                <p>Sum:</p>
                <p className="total-value">$ {totalPrice}</p>
            </div>
            <Button
                title="Next step"
                type="button"
                className="next-step-button"
                disabled={ cart.length === 0 }
                onClick={moveAhead} 
            />
        </>
    )
}

export default CartPage;
