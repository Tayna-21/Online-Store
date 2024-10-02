import React from 'react';
import { useDispatch } from 'react-redux';
import { updateProductQuantity, deleteProduct } from '../../store/CartSlice.ts';
import { AppDispatch } from '../../store';
import { ProductProps } from '../../interfaces';
import Button from '../Button';
import PlusIcon from '../Icons/PlusIcon.tsx';
import MinusIcon from '../Icons/MinusIcon.tsx';
import DeleteIcon from '../Icons/DeleteIcon.tsx';

const CartPageStoreItem: React.FC<ProductProps> = ({id, image, description, price, quantity}) => {
    const dispatch = useDispatch<AppDispatch>();
    const disabled: boolean = ( quantity === 1 );

    const manipulateQuantity = (event: React.MouseEvent<HTMLButtonElement>) => {
        const actionValue: string = (event.target as HTMLButtonElement).value;

        dispatch(updateProductQuantity({id, actionValue}));
    };

    const deleteProductFromCart = () => {
        dispatch(deleteProduct(id));
    }

    return (
        <li id={id}>
            <div className="img-cart-item" style={{background: `url("${image}") center center/contain no-repeat`}}></div>
            <div className="description-and-delete-button">
                <strong className="description">{description}</strong>
                <Button
                    type="button"
                    title="Delete"
                    className="delete-button"
                    onClick={deleteProductFromCart}
                    icon={ <DeleteIcon/> }
                />
            </div>
            <div className="quantity-and-price">
                <div className="quantity">
                    <Button
                        type="button"
                        onClick={manipulateQuantity}
                        disabled={disabled}
                        icon={ <MinusIcon /> }
                        value="reduce"
                    />
                    <span>{quantity}</span>
                    <Button
                        type="button"
                        onClick={manipulateQuantity}
                        icon={ <PlusIcon /> }
                        value="increase"
                    />
                </div>
                <p className="price">price: <span>${price}</span></p>
            </div>
        </li>
    )
}

export default CartPageStoreItem;
