import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { formatForId } from "../../../utils/testUtils";

const SeatType = ({ name, price, description }) => {
    const formattedName = formatForId(name);

    return (
        <>
            <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3 mb-4 sm:mb-6">
                <h1
                    className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-neutral-800"
                    data-testid={`seat-type-title-${formattedName}`}
                >
                    {name} Seats
                </h1>
                <h1
                    className={`font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl
                ${name === "Love" ? "text-dark-red" : "text-neutral-800"}`}
                    data-testid={`seat-type-price-${formattedName}`}
                >
                    {price} KM
                </h1>

                <p className="font-normal text-xs sm:text-sm md:text-base text-neutral-700">*per ticket</p>
            </div>

            <ul
                className="list-disc list-inside text-left text-neutral-800 space-y-0.5 sm:space-y-1 md:space-y-2 lg:space-y-3 self-start"
                data-testid={`seat-type-features-list-${formattedName}`}
            >
                {description && description.map((item, index) => (
                    <li key={index} className="flex flex-row justify-start gap-0.5 sm:gap-1 md:gap-2 items-center">
                        <FontAwesomeIcon
                            icon={faCheck}
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 text-dark-red"
                        />
                        <span
                            className="font-normal text-[10px] sm:text-xs md:text-sm lg:text-base"
                            data-testid={`seat-type-feature-item-${formattedName}-${index}`}
                        >
                            {item}
                        </span>
                    </li>
                ))}
            </ul>

        </>
    );
}

export default SeatType;