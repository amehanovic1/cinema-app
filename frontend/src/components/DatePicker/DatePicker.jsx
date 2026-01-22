import { useEffect, useState } from "react";

const DatePicker = ({ numberOfDays = 10, selectedValue, onChange }) => {

    const [dates, setDates] = useState([])
    const selectedDate = selectedValue ? new Date(selectedValue) : null
    const todayDate = new Date()

    useEffect(() => {
        createDateRange();
    }, [])

    const handleChange = (date) => {
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
        <div className="overflow-x-auto" data-testid="date-picker-scroll-container">
            <div
                className="flex justify-start min-w-full items-center justify-between gap-2 md:gap-4"
                data-testid="date-picker-list-wrapper"
            >
                {dates.map((date, index) =>
                    <button
                        key={index}
                        data-testid={`date-picker-item-${index}`}
                        className={`
                        flex flex-col items-center justify-center
                        px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-3
                        rounded-xl shadow-card
                        text-xs sm:text-sm md:text-base
                        ${isSameDate(date, selectedDate)
                                ? "bg-dark-red text-white font-bold" : "bg-neutral-0"}`}
                        onClick={() => handleChange(date)}>

                        <div className="flex gap-2 font-bold" data-testid={`date-picker-date-group-${index}`}>
                            <h1 data-testid={`date-picker-month-${index}`}>
                                {date.toLocaleDateString('en-US', { month: 'short' })}
                            </h1>
                            <h1 data-testid={`date-picker-day-${index}`}>
                                {date.toLocaleDateString('en-US', { day: 'numeric' })}
                            </h1>
                        </div>

                        <div data-testid={`date-picker-weekday-group-${index}`}>
                            <h1 data-testid={`date-picker-weekday-${index}`}>{isSameDate(todayDate, date)
                                ? "Today"
                                : date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </h1>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}

export default DatePicker;