import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/index.tsx';
import HomePage from './pages/HomePage.tsx';
import CartPage from './pages/CartPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import ShipmentPage from './pages/ShipmentPage.tsx';
import ConfirmationPage from './pages/ConfirmationPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

const URL: string = 'https://dummyjson.com/products';

async function getData() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        return data.products;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }

        return null;
    }
}

const router = createBrowserRouter ([
    {
        path: '/',
        element: <HomePage />,
        loader: getData,
    },
    {
        element: <Layout />,
        children: [
            {
                path: 'cart',
                element: <CartPage />,
            },
            {
                path: 'contact',
                element: <ContactPage />
            },
            {
                path: 'shipment',
                element: <ShipmentPage />
            },
            {
                path: 'confirmation',
                element: <ConfirmationPage />
            },
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
]);

const App: React.FC = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;
