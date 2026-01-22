import "react-datepicker/dist/react-datepicker.css";
import "./date-range-picker.css"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns"
import DatePicker from "react-datepicker";

const DateRangePicker = ({ initialStartDate, initialEndDate, onChangeSet }) => {

    const [isSelectorOpen, setIsSelectorOpen] = useState(false)
    const [dateRange, setDateRange] = useState("")
    const [startDate, setStartDate] = useState(initialStartDate ? new Date(initialStartDate) : "")
    const [endDate, setEndDate] = useState(initialEndDate ? new Date(initialEndDate) : "")

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    const handleApply = () => {
        setIsSelectorOpen(false)
        if (startDate && endDate) {
            const start = startDate ? format(startDate, "yyyy-MM-dd") : ""
            const end = endDate ? format(endDate, "yyyy-MM-dd") : ""
            onChangeSet({ start, end });
            setDateRange(`${format(startDate, "yyyy/MM/dd")} - ${format(endDate, "yyyy/MM/dd")}`);
        }
        else {
            setStartDate("")
            setEndDate("")
            onChangeSet({ start: "", end: "" })
            setDateRange("Date range")
        }

    }

    const handleCancel = () => {
        setIsSelectorOpen(!isSelectorOpen)
        setStartDate("")
        setEndDate("")
        onChangeSet({ start: "", end: "" })
        setDateRange("Date range")
    }

    return (

        <div
            className="w-full font-base relative overflow-visible bg-neutral-0 shadow-input"
            data-testid="date-range-picker-container"
        >
            <div
                data-testid="date-range-picker-display"
                onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                className={`w-full p-2 flex items-center justify-between border rounded cursors-pointer
                        ${isSelectorOpen ? "border-dark-red" : "border-neutral-200 "}`}
            >

                <div className="flex gap-2 w-full items-center">
                    <FontAwesomeIcon
                        icon={faCalendarDays}
                        data-testid="date-range-picker-calendar-icon"
                        className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4
                                ${isSelectorOpen ? "text-dark-red" : "text-neutral-400 "}`}
                    />

                    <span
                        data-testid="date-range-picker-selected-text"
                        className="justify-start text-xs md:text-sm lg:text-base font-normal text-neutral-500"
                    >
                        {dateRange ? dateRange : "Date Range"}
                    </span>
                </div>

                <FontAwesomeIcon
                    icon={faAngleDown}
                    data-testid="date-range-picker-arrow-icon"
                    className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 transition 
                            ${isSelectorOpen ? "rotate-180 text-dark-red" : "text-neutral-400 "}`}
                />
            </div>

            <div
                data-testid="date-range-picker-dropdown"
                className={`absolute left-0 rigth-0 z-40 p-4 w-full bg-neutral-0 mt-1 shadow-card
                        overflow-y-auto transition-all duration-300 rounded flex flex-col items-center gap-2 
                        ${isSelectorOpen ? "opacity-100" : "hidden"}`}>
                <div className="grid grid-cols-2 gap-2">

                    <div className="flex flex-col">
                        <label
                            data-testid="date-range-picker-start-label"
                            className="text-xs text-neutral-600 mb-1">
                            Start date
                        </label>
                        <input
                            type="text"
                            readOnly
                            data-testid="date-range-picker-start-input-preview"
                            value={startDate ? format(startDate, "yyyy/MM/dd") : ""}
                            className="border border-neutral-300 rounded-xl px-2 py-1" />
                    </div>

                    <div className="flex flex-col">
                        <label
                            data-testid="date-range-picker-end-label"
                            className="text-xs text-neutral-600 mb-1">
                            End date
                        </label>
                        <input
                            type="text"
                            readOnly
                            data-testid="date-range-picker-end-input-preview"
                            value={endDate ? format(endDate, "yyyy/MM/dd") : ""}
                            className="border border-neutral-300 rounded-xl px-2 py-1" />
                    </div>
                </div>

                <div className="flex justify-center" data-testid="date-range-picker-calendar-container">
                    <DatePicker
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        selectsRange
                        inline
                    />
                </div>

                <div className="w-full flex justify-end items-center gap-2">
                    <button
                        data-testid="date-range-picker-cancel-button"
                        className="font-semibold text-sm border border-dark-red rounded-lg 
                                bg-neutral-25 text-dark-red px-2 py-2"
                        onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        data-testid="date-range-picker-apply-button"
                        className="font-semibold text-sm border rounded-lg bg-dark-red text-neutral-25 px-2 py-2"
                        onClick={handleApply}>
                        Apply
                    </button>

                </div>
            </div>
        </div>
    );
}

export default DateRangePicker;