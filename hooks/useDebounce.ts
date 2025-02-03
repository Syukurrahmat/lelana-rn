import { useEffect, useRef, useState } from "react";

export function useDebouncedValue<T>(inputValue: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, delay]);

    return debouncedValue;
}


export function useDebouncedCallback<A extends any[]>(
    callback: (...args: A) => void,
    wait?: number
) {
    const argsRef = useRef<A>();
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    function cleanup() {
        if (timeout.current) clearTimeout(timeout.current);
    }
    useEffect(() => cleanup, []);

    return function debouncedCallback(...args: A) {
        argsRef.current = args;
        cleanup();
        timeout.current = setTimeout(() => {
            if (argsRef.current) {
                callback(...argsRef.current);
            }
        }, wait);
    };
}