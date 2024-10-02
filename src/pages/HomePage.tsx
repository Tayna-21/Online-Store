import React, { useState, useEffect } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCartFromStorage } from '../store/CartSlice.ts';
import { shopData, Product } from '../interfaces';
import { RootState, AppDispatch } from "../store";
import Header from '../components/Header/index.tsx';
import Button from '../components/Button/index.tsx';
import PlusIcon from '../components/Icons/PlusIcon.tsx';
import CheckedIcon from '../components/Icons/CheckedIcon.tsx';

const HomePage: React.FC = () => {
    const shopDataJson = useLoaderData() as shopData[];
    const [products, setProducts] = useState<Product[]>([]);
    const cartStateInStore = useSelector((state: RootState) => state.shop.cart);
    const [cartInStorage, setCartInStorage] = useLocalStorage('productsInStorage', cartStateInStore);
    const cart = ( cartStateInStore.length > 0 ? cartStateInStore : cartInStorage );
    const location = useLocation(); 
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        if (location.state === '/confirmation') {
            localStorage.clear()
            window.history.replaceState({}, '')
            window.location.reload()
        }
    }, []);

    useEffect((): void => {
        const transformedData: Product[] = shopDataJson.map((item) => {
            return {
                id: item.id.toString(),
                image: item.images[0],
                description: item.description,
                price: item.price,
                quantity: 0
            };
        });

        setProducts(transformedData);
    }, []);

    useEffect((): void => {
        if (cartInStorage.length > 0) {
            dispatch(updateCartFromStorage(cartInStorage));
        } else {
            return
        }
    }, [cartInStorage, dispatch]);

    const chooseProduct = (id: string): void => {
        const isProductInCart = cartStateInStore.some((item) => {
            return (item ? item.id === id : false)
        });

        if (isProductInCart) {
            return;
        } else {
            const selectedItem: Product | undefined = products.find(item => item.id === id);

            if (selectedItem) {
                selectedItem.quantity = 1;

                dispatch(addToCart(selectedItem));

                setCartInStorage((state) => {
                    return [...state, selectedItem];
                });
            } else {
                console.log('product not found');
                
                return;
            }
        }
    };

    return (
        <div className="home-page-wrapper">
            <Header amountOfAddedProducts={(cart.length > 0 ? cart.length : null)} />
            <main className="home-page-main">
                <div className="home-container">
                    <ul className="home-list-products">
                        {products && products.map((product, index) => {
                            const isAdded = cart.find(item => item.id === product.id);
    
                            return (
                                <li id={product.id} key={index}>
                                    <div className="img-block" style={{background: `url("${product.image}") center center/contain no-repeat`}}></div>
                                    <div className="info-block">
                                        <strong className="description">{product.description}</strong>
                                        <p className="price">$ {product.price}</p>
                                        <Button
                                            type="button"
                                            onClick={() => chooseProduct(product.id)}
                                            title={isAdded ? "Added" : "Add to cart"}
                                            icon={isAdded ? <CheckedIcon/> : <PlusIcon/>}
                                            style={{backgroundColor: isAdded ? '#0cd52b' : '#00ae1c'}}
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </main>
        </div>
    );
    
};

export default HomePage;