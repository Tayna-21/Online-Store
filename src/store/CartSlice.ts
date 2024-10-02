import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { initialProductState} from "../utilities";
import { Product, ProductQuantityUpdating } from "../interfaces";

const initialState = initialProductState;

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const addedItem: Product = action.payload;

            return {
                ...state,
                cart: [...state.cart, addedItem]
            };
        },

        updateCartFromStorage(state, action: PayloadAction<Product[]>) {
            const storedItems = action.payload;

            return {
                ...state,
                cart: storedItems
            };
        },

        updateProductQuantity(state, action: PayloadAction<ProductQuantityUpdating>) {
            const {id, actionValue} = action.payload;           
            const productToUpdate  = state.cart.find(product => product.id === id);

            if (productToUpdate) {
                ( actionValue === 'increase' ? 
                    productToUpdate.quantity++ : actionValue === 'reduce' ? 
                    productToUpdate.quantity-- : productToUpdate.quantity );
            } else {
                console.log('product not found')
                return;
            }
        },

        deleteProduct(state, action: PayloadAction<string>) {
            const itemToDeleteId = action.payload;
            const indexOfItemToDelete = state.cart.findIndex(item => item.id === itemToDeleteId);

            state.cart.splice(indexOfItemToDelete, 1);
        },

        updateTotalPrice(state, action: PayloadAction<string>) {
            const updatedPrice = action.payload;
            
            return {
                ...state,
                totalPrice: updatedPrice
            }
        }
    }
})

export const { addToCart, updateCartFromStorage, updateProductQuantity, deleteProduct, updateTotalPrice } = shopSlice.actions;
export default shopSlice.reducer;
