import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './CartSlice.ts';
import formReducer from './FormSlice.ts';

const store = configureStore ({
    reducer: {
        shop: shopReducer,
        form: formReducer
    },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
