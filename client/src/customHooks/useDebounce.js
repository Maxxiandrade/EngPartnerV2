import { useState } from 'react';

const useDebounce = (fn, delay = 750) => {
    const [timer, setTimer] = useState(null);

    return (...args) => {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            fn(...args);
        }, delay);
        setTimer(newTimer);
    };
};

export default useDebounce;
