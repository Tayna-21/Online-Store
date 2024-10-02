import React, { useEffect } from 'react';
import { useLocalStorage } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { updateCartFromStorage } from "../../store/CartSlice.ts";
import { RootState, AppDispatch } from "../../store/index.tsx";
import { Outlet } from 'react-router-dom';
import Header from '../Header/index.tsx';

const Layout: React.FC = () => {
    const cartStateInStore = useSelector((state: RootState) => state.shop.cart);
    const [cartInStorage] = useLocalStorage('productsInStorage', cartStateInStore);
    const dispatch = useDispatch<AppDispatch>();
  
    useEffect(() => {
        if (cartInStorage.length > 0) {
            dispatch(updateCartFromStorage(cartInStorage));
        } else {
            return;
        }
    }, [cartInStorage, dispatch]);

    return (
        <div className="wrapper">
          <Header />
          <main>
            <div className='container'>
              <div className="content">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
    )
}

export default Layout;
