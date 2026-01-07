import React, { useEffect, useState } from "react";
import SeatTypeLegend from "../SeatTypeLegend/SeatTypeLegend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CinemaHallSeatBooking = ({ seatTypes, hallSeats = [], reservedSeats, handleClick }) => {
    const [seats, setSeats] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])

    useEffect(() => {
        const initializeSeats = () => {
            return hallSeats.map((seat) => ({
                ...seat,
                status: reservedSeats?.includes(seat.id) ? "booked" : "available",
                selected: false
            }))
        }

        setSeats(initializeSeats())
    }, [hallSeats, reservedSeats])


    const getSeatClassName = (seat) => {
        const baseClassName = "flex justify-center items-center border h-10 px-4 py-2" +
            "border-neutral-200 rounded text-sm text-neutral-800 cursor-pointer";

        if (seat.seatType.seatType === "Love") {
            if (seat.status === "booked")
                return `${baseClassName} w-24 bg-neutral-200 text-white cursor-not-allowed`;
            if (seat.selected)
                return `${baseClassName} w-24 bg-dark-red text-white border-dark-red`;
            return `${baseClassName} w-24`;
        }

        if (seat.status === "booked")
            return `${baseClassName} w-12 bg-neutral-200 text-white cursor-not-allowed`

        if (seat.selected)
            return `${baseClassName} w-12 bg-dark-red text-white border border-dark-red`

        return `${baseClassName} w-12`;
    }

    const handleSeatClick = (seat) => {
        if (seat.status === "booked") return;

        setSeats((prev) =>
            prev.map((s) =>
                s.id === seat.id
                    ? { ...s, selected: !s.selected }
                    : s
            )
        );

        if (!seat.selected)
            setSelectedSeats((prev) => [...prev, seat]);
        else
            setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
    }

    const getTotalPrice = () => {
        return selectedSeats.reduce((total, seat) => total + seat.seatType.price, 0);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-8 m-6">

            <div className="md:row-span-3 flex flex-col items-center gap-4">
                <h1 className="text-neutral-800 font-regular text-sm md:text-base">Cinema Screen</h1>

                    <svg className="h-4">
                        <ellipse
                            cx="50%"
                            cy="100%"
                            rx="50%"
                            ry="100%"
                            fill="none"
                            stroke="#B22222"
                            strokeWidth="3"
                        />
                    </svg>

                <div className="overflow-x-auto">
                    <div className="flex flex-wrap justify-center items-center">

                        {seats.map((seat, index) => {
                            const isLoveSeat = seat.seatType.seatType === "Love";
                            return (
                                <React.Fragment key={seat.id}>
                                    <div
                                        className={getSeatClassName(seat)}
                                        onClick={() => handleSeatClick(seat)}>

                                        {seat.seatType.seatType === "VIP" && (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className={`w-3 h-3 ${seat.selected ? "text-white" : "text-neutral-400"}`}
                                            />
                                        )}
                                        {seat.seatCode}

                                    </div>

                                    {isLoveSeat && (index + 1) % 2 === 0 && <span className="w-10 shrink-0"></span>}
                                    {!isLoveSeat && (index + 1) % 4 === 0 && <span className="w-10 shrink-0"></span>}
                                    {!isLoveSeat && (index + 1) % 8 === 0 && <span className="w-full shrink-0"></span>}

                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>


            <div className="flex flex-col gap-2">
                <h1 className="font-regular text-sm md:text-base text-neutral-800 text-center">
                    Seat Guide
                </h1>

                <SeatTypeLegend seatTypes={seatTypes} />

                <hr className="bg-neutral-200" />
            </div>

            <div className="flex flex-col text-center">
                <h1 className="font-regular text-sm md:text-base text-neutral-800">
                    Chosen Seats
                </h1>

                <div className="flex justify-between text-sm text-neutral-500">
                    <span>Seat(s)</span>
                    <span>Total price</span>
                </div>

                <hr className="bg-neutral-200" />

                <div className="flex gap-4 w-full justify-between text-lg md:text-xl text-neutral-800 font-bold">
                    {getTotalPrice() !== 0 && (
                        <>
                            <div className="w-1/2 text-left">{selectedSeats.map(seat => seat.seatCode).join(", ")}</div>
                            <div className="w-1/2 text-right">{getTotalPrice()} KM</div>
                        </>
                    )}
                </div>
            </div>

            <div className="justify-center">
                <button
                    className="bg-dark-red text-neutral-25 font-semibold text-sm md:text-base rounded-lg w-full py-1"
                    onClick={() => handleClick(selectedSeats)}>
                    Reserve Ticket

                </button>
            </div>

        </div>


    );
}

export default CinemaHallSeatBooking;