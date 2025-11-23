import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css"
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
        const start = startDate ? format(startDate, "yyyy-MM-dd") : ""
        const end = endDate ? format(endDate, "yyyy-MM-dd") : ""
        onChangeSet({ start, end })

        if (startDate && endDate)
            setDateRange(`${format(startDate, "yyyy/MM/dd")} - ${format(endDate, "yyyy/MM/dd")}`)
    }

    const handleCancel = () => {
        setIsSelectorOpen(!isSelectorOpen)
        setStartDate("")
        setEndDate("")
        onChangeSet({ start: "", end: ""})
        setDateRange("Date range")
    }

    return (

        <div className="w-full font-base relative overflow-visible bg-neutral-0 shadow-input">
            <div
                className="w-full p-2 flex items-center justify-between border rounded cursors-ppinter"
                onClick={() => setIsSelectorOpen(!isSelectorOpen)}>

                <div className="flex gap-2 w-full items-center">
                    <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-neutral-400"
                    />

                    <span className="justify-start text-xs md:text-sm lg:text-base font-normal text-neutral-500">
                        {dateRange ? dateRange : "Date Range"}
                    </span>
                </div>

                <FontAwesomeIcon
                    icon={faAngleDown}
                    className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-neutral-400 transition 
                            ${isSelectorOpen ? "rotate-180" : ""}`}
                />
            </div>

            <div className={`absolute left-0 rigth-0 z-50 p-4 w-full bg-neutral-0 mt-1 shadow-card
                            overflow-y-auto transition-all duration-300 rounded flex flex-col items-center gap-2 
                        ${isSelectorOpen ? "opacity-100" : "hidden"}`}>
                <div className="grid grid-cols-2 gap-2">

                    <div className="flex flex-col">
                        <label className="text-xs text-neutral-600 mb-1">Start date</label>
                        <input
                            type="text"
                            readOnly
                            value={startDate ? format(startDate, "yyyy/MM/dd") : ""}
                            className="border border-neutral-300 rounded-xl px-2 py-2" />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs text-neutral-600 mb-1">End date</label>
                        <input
                            type="text"
                            readOnly
                            value={endDate ? format(endDate, "yyyy/MM/dd") : ""}
                            className="border border-neutral-300 rounded-xl px-2 py-2" />
                    </div>
                </div>

                <div className="flex justify-center">
                    <DatePicker
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        selectsRange
                        inline
                        calendarClassName="w-full h-full"
                    />
                </div>

                <div className="w-full flex justify-end items-center gap-2">
                    <button
                        className="font-semibold text-xs border border-dark-red rounded-lg 
                                bg-neutral-25 text-dark-red px-2 py-2"
                        onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        className="font-semibold text-xs rounded-lg bg-dark-red text-neutral-25
                                    px-2 py-2"
                        onClick={handleApply}>
                        Apply
                    </button>

                </div>
            </div>
        </div>
    );
}

export default DateRangePicker;