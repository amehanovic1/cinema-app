import { useCallback, useEffect, useState } from "react";

const useTimer = ({ initialMinutes = 0, initialSeconds = 0 } = {}) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    const reset = useCallback((newMins, newSecs) => {
        setMinutes(newMins);
        setSeconds(newSecs);
    }, []);

    useEffect(() => {
        const myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prev => prev - 1);
            } else if (minutes > 0) {
                setMinutes(prev => prev - 1);
                setSeconds(59);
            } else {
                clearInterval(myInterval);
            }
        }, 1000);

        return () => clearInterval(myInterval);
    }, [minutes, seconds]);

    return { minutes, seconds, reset };
}

export default useTimer;