import { useEffect, useState } from "react";

const useTimer = ({ initialMinutes = 0, initialSeconds = 0 }) => {
    const [minutes, setMinutes] = useState(initialMinutes)
    const [seconds, setSeconds] = useState(initialSeconds)

    useEffect(() => {
        const myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    }, [seconds, minutes]);

    const reset = () => {
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
    }

    return { minutes, seconds, reset };
}

export default useTimer;