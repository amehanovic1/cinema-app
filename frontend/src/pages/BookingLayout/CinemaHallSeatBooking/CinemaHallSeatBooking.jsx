import React, { useEffect, useState } from "react";
import SeatTypeLegend from "../SeatTypeLegend/SeatTypeLegend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { updateSeatSelection } from "../../../services/bookingService";
import { formatForId } from "../../../utils/testUtils";

const CinemaHallSeatBooking = ({
    bookingData,
    projectionDetails,
    seatTypes,
    hallSeats,
    reservedSeats,
    handleClick,
    mode = "reserve"
}) => {
    const { id: bookingId, selectedSeats: initialSelectedSeats = [] } = bookingData || {};
    const { id: projectionId } = projectionDetails || {};

    const [selectedSeats, setSelectedSeats] = useState(initialSelectedSeats);

    useEffect(() => {
        setSelectedSeats(initialSelectedSeats);
    }, [initialSelectedSeats]);

    const seats = hallSeats.map((seat) => {
        const isBooked = reservedSeats?.includes(seat.id);
        const isCurrentSelection = selectedSeats.some(s => s.id === seat.id);

        return {
            ...seat,
            status: isBooked && !isCurrentSelection ? "booked" : "available",
            selected: isCurrentSelection
        };
    });

    const getSeatClassName = (seat) => {
        const baseClassName = "flex justify-center items-center border rounded transition-all";

        const isLove = seat.seatType.category === "Love";
        const widthClass = isLove ? "col-span-2 h-10 w-full" : "col-span-1 h-10 w-full";

        let colorClass = "";
        if (seat.status === "booked") {
            colorClass = "bg-neutral-200 text-white cursor-not-allowed border-neutral-200";
        } else if (seat.selected) {
            colorClass = "bg-dark-red text-white border-dark-red shadow-md cursor-pointer";
        } else {
            colorClass = "bg-white text-neutral-800 border-neutral-200 hover:border-dark-red cursor-pointer";
        }

        return `${baseClassName} ${widthClass} ${colorClass}`;
    };

    const handleSeatClick = async (seat) => {
        if (seat.status === "booked") return;
        if (!bookingId) return;

        try {
            await updateSeatSelection({
                bookingId,
                seatId: seat.id,
                projectionId
            });

            setSelectedSeats((prev) =>
                seat.selected
                    ? prev.filter((s) => s.id !== seat.id)
                    : [...prev, seat]
            );

        } catch (error) {
            console.log(error);
        }
    };

    const getTotalPrice = () => {
        return selectedSeats.reduce((total, seat) => total + seat.seatType.price, 0);
    }

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 m-8 items-stretch"
            data-testid="seat-booking-main-wrapper">

            <div className="flex flex-col items-center gap-4" data-testid="seat-map-section">
                <h1
                    className="text-neutral-800 font-regular text-sm md:text-base"
                    data-testid="cinema-screen-text">
                    Cinema Screen
                </h1>

                <svg className="h-4" data-testid="cinema-screen-svg">
                    <ellipse cx="50%" cy="100%" rx="50%" ry="100%" fill="none" stroke="#B22222" strokeWidth="3"
                    />
                </svg>

                <div className="w-full overflow-x-auto pb-4">
                    <div className="grid grid-cols-9 gap-2 min-w-[600px] items-center" data-testid="seat-layout-grid">
                        {seats.map((seat, index) => {
                            const formattedSeatCode = formatForId(seat.seatCode);
                            const formattedCategory = formatForId(seat.seatType.category);

                            const isLoveSeat = seat.seatType.category === "Love";
                            const isAisleSlot = isLoveSeat
                                ? (index % 4 === 1)
                                : (index % 8 === 3);

                            return (
                                <React.Fragment key={seat.id}>
                                    <div
                                        data-testid={`seat-code-${formattedSeatCode}`}
                                        data-seat-type={`seat-category-${formattedCategory}`}
                                        className={getSeatClassName(seat)}
                                        onClick={() => handleSeatClick(seat)}
                                    >
                                        {seat.seatType.category === "VIP" && (
                                            <FontAwesomeIcon icon={faStar} className="mr-1 w-3 h-3" data-testid={`seat-icon-vip-${formattedSeatCode}`} />
                                        )}
                                        {seat.seatCode}
                                    </div>

                                    {isAisleSlot && <div className="col-span-1 h-10" data-testid="aisle-spacer"></div>}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

            </div>


            <div className="flex flex-col h-full justify-between py-6" data-testid="seat-booking-sidebar">
                <div className="flex flex-col gap-2">
                    <h1 className="font-regular text-sm md:text-base text-neutral-800 text-center" data-testid="seat-guide-text">
                        Seat Guide
                    </h1>

                    <div data-testid="seat-legend-wrapper">
                        <SeatTypeLegend seatTypes={seatTypes} />
                    </div>

                    <hr className="bg-neutral-200" />
                </div>

                <div className="flex flex-col text-center" data-testid="selected-seats-summary">
                    <h1 className="font-regular text-sm md:text-base text-neutral-800" data-testid="chosen-seats-text">
                        Chosen Seats
                    </h1>

                    <div className="flex justify-between text-sm text-neutral-500">
                        <span data-testid="seat-text">Seat(s)</span>
                        <span data-testid="total-price-text">Total price</span>
                    </div>

                    <hr className="bg-neutral-200" />

                    <div className="flex gap-4 w-full justify-between text-lg md:text-xl text-neutral-800 font-bold">
                        {getTotalPrice() !== 0 && (
                            <>
                                <div className="w-1/2 text-left" data-testid="selected-seats-list">
                                    {selectedSeats.map(seat => seat.seatCode).join(", ")}
                                </div>
                                <div className="w-1/2 text-right">
                                    <span data-testid="total-price-amount">{getTotalPrice()}</span> KM
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="justify-center">
                    <button
                        data-testid="seat-booking-continue-button"
                        className={`
                            ${selectedSeats.length === 0
                                ? "bg-neutral-300 cursor-not-allowed"
                                : "bg-dark-red hover:bg-red-700 active:scale-95"
                            } text-neutral-25 font-semibold text-sm md:text-base rounded-lg w-full py-2 transition-all duration-200`}
                        onClick={() => handleClick(selectedSeats)}
                        disabled={selectedSeats.length === 0}
                    >
                        <span data-testid="button-action-text">
                            {mode === "payment" ? "Continue to Payment" : "Make Reservation"}
                        </span>
                    </button>
                </div>

            </div>
        </div>

    );
}

export default CinemaHallSeatBooking;