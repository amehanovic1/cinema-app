import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function SeatType({ name, price, description }) {
    return (
        <>
            <h1 className="heading-h6">{name} Seats</h1>
            <h1 className={`heading-h4 
                ${name === "Love" ? "text-dark-red" : "text-neutral-800"

                }`}
            >{price} KM</h1>

            <p className="font-regular text-[16px]">*per ticket</p>

            <ul className="list-disc list-inside text-left text-neutral-800 mt-10 space-y-3">
                {description && description.map((item, index) => (
                    <li key={index} className="flex flex-row justify-start gap-4 items-center">
                        <FontAwesomeIcon
                            icon={faCheck}
                            className="w-[16px] h-[14px] text-dark-red" />
                        <span className="font-regular text-[16px]">{item}</span>
                    </li>
                ))}
            </ul>

        </>
    );
}

export default SeatType;