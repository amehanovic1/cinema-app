import { useEffect, useState } from "react";

const DatePicker = ({ numberOfDays = 10, onChange }) => {

    const [currentDate, setCurrentDate] = useState(new Date())
    const [dates, setDates] = useState([])

    useEffect(() => {
        generateDates();
    }, [])

    const generateDates = () => {
        const startDate = new Date()
        const array = []
        for (let i = 0; i < numberOfDays; i++) {
            const newDate = new Date(startDate)
            newDate.setDate(newDate.getDate() + i)
            array.push(newDate)
        }
        setDates(array)
    } 
    
    const handleChange = (date) => {
        setCurrentDate(date);
        if (onChange) onChange(date.toLocaleDateString('sv-SE'));
    }

    return (
        <div className="flex flex-row flex-wrap items-center justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-8 justify-start">
            {dates.map((date, index) =>
               
               <button
                    key={index}
                    className={`
                        flex flex-col items-center justify-center
                        px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-3
                        rounded-xl shadow-card
                        text-xs sm:text-sm md:text-base
                        ${date.getDate() === currentDate.getDate() 
                            ? "bg-dark-red text-white font-bold" : "bg-neutral-0"}`}
                            onClick={() => handleChange(date)}>
                   
                    <div className="flex gap-2">
                        <h1>{date.toLocaleDateString('en-US', { month: 'short' })} </h1>
                        <h1>{date.toLocaleDateString('en-US', { day: 'numeric' })} </h1>
                    </div>

                    <div>
                        <h1>{date.toLocaleDateString('en-US', { weekday: 'short' })}</h1>
                    </div>
                </button>)}
        </div>
    );
}

export default DatePicker;