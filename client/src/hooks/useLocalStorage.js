import { useState } from "react";


export function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        const value = localStorage.getItem(key);
        if (value) {
            console.log('in useLocalStorage init: ', value);
            return JSON.parse(value)
        } else {
            return initialValue;
        }
    });

    function setLocalState(newState) {
        setState(newState)

        localStorage.setItem(key, JSON.stringify(newState));
        console.log('in useLocalStorage change: ', newState);
    }

    return [state, setLocalState];
};
