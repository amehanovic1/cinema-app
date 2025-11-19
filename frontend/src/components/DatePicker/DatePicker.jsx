import { useEffect, useState } from "react";

const DatePicker = ({ numberOfDays = 10, onChange }) => {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [dates, setDates] = useState([])
    const [todayDate] = useState(new Date())

    useEffect(() => {
        createDateRange();
    }, [])

    const handleChange = (date) => {
        setSelectedDate(date);
        if (onChange) onChange(date.toLocaleDateString('sv-SE'));
    }

    const createDateRange = () => {
        const today = new Date()
        const dateList = []
        for (let i = 0; i < numberOfDays; i++) {
            const newDate = new Date(today)
            newDate.setDate(newDate.getDate() + i)
            dateList.push(newDate)
        }
        setDates(dateList)
    }

    const isSameDate = (d1, d2) => {
       return (
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear()
       );
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
                        ${date.getDate() === selectedDate.getDate()
                            ? "bg-dark-red text-white font-bold" : "bg-neutral-0"}`}
                    onClick={() => handleChange(date)}>

                    <div className="flex gap-2 font-bold">
                        <h1>{date.toLocaleDateString('en-US', { month: 'short' })} </h1>
                        <h1>{date.toLocaleDateString('en-US', { day: 'numeric' })} </h1>
                    </div>

                    <div>
                        <h1>{isSameDate(todayDate, date)
                            ? "Today"
                            : date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </h1>
                    </div>
                </button>)}
        </div>
    );
}

export default DatePicker;