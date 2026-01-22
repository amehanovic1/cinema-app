import { formatForId } from "../../../utils/testUtils";
import SeatType from "../SeatType/SeatType";

const PricingCards = ({ seats }) => {
    return (
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
            {seats.map((seat) => {
                const formattedName = formatForId(seat.name);

                return (
                    <div
                        key={seat.id}
                        data-testid={`pricing-card-${formattedName}`}
                        className={`relative border rounded-lg w-full max-w-[90%] sm:w-5/12 md:w-1/3 lg:w-1/4
                        ${seat.name === "Love"
                                ? "py-8 sm:py-10 shadow-card"
                                : "py-2 sm:py-3"}`}>

                        <div className="relative p-4 flex flex-col justify-between items-center gap-4 w-full h-full">
                            <SeatType  {...seat} />

                            <button
                                data-testid={`pricing-card-explore-btn-${formattedName}`}
                                className={`border p-2 rounded-lg w-1/2 sm:w-40 mt-2 sm:mt-3 md:mt-4 lg:mt-5
                                ${seat.name === "Love"
                                        ? "bg-dark-red border-neutral-25 text-neutral-25"
                                        : "bg-neutral-25 border-dark-red text-dark-red"
                                    }`}
                            >Explore Movies</button>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}

export default PricingCards;