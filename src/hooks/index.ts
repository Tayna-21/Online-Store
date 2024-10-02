import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [value, setValue] = useState<T>(() => {
        try {
            const dataFromStorage = localStorage.getItem(key);

            return dataFromStorage ? JSON.parse(dataFromStorage) as T : initialValue;
        } catch (error) {
            console.log((error as Error).message);

            return initialValue;
        }
    });

    const setStorage = (data: T | ((prevValue: T) => T)) => {
        try {
            const dataToStore = data  instanceof Function ? data(value) : data;

            setValue(dataToStore);

            localStorage.setItem(key, JSON.stringify(dataToStore));
        } catch (error) {
            console.log((error as Error).message)
        }
    };

    return [value, setStorage] as const;
};

export { useLocalStorage };
