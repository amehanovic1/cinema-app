import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SeatTypeLegend = ({ seatTypes }) => {
    const seatStatus = [
        { label: "Available", bg: "bg-neutral-0", border: "border-neutral-200", text: "text-neutral-800" },
        { label: "Reserved", bg: "bg-neutral-200", border: "border-neutral-200", text: "text-neutral-800" },
        { label: "Selected", bg: "bg-dark-red", border: "", text: "text-neutral-0" },
    ];

    return (
        <div className="flex gap-6 mt-4 justify-between">

            <div className="flex flex-col gap-2">
                {seatStatus.map((status) => (
                    <div key={status.label} className="flex items-center gap-2 text-xs md:text-sm">
                        <span className={`w-8 h-6 md:w-10 md:h-8 px-2 py-1 flex items-center justify-center ${status.bg} border ${status.border} rounded ${status.text}`}>
                            XY
                        </span>
                        <span className="text-neutral-700">{status.label}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2">

                {seatTypes.map((type) => (
                    <div key={type.category} className="flex items-center gap-2 text-sm">
                        <span
                            className={`h-6 md:h-8 px-2 py-1 flex items-center justify-center 
                                        bg-neutral-0 border border-neutral-200 rounded 
                                        ${type.category === "VIP"
                                    ? "bg-neutral-0 w-8 md:w-10"
                                    : type.category === "Love" ? "w-16 md:w-20" : "w-8 md:w-10"}`}
                        >
                            {type.category === "VIP" && (
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={"w-2 h-2 md:w-3 md:h-3 text-neutral-400"} />
                            )}
                            XY </span>
                        <span className="text-sm text-neutral-700">{type.category} Seats ({type.price} BAM)</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SeatTypeLegend;
