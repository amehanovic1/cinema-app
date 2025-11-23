import { startOfWeek, endOfWeek, isWithinInterval, format } from "date-fns"

const Card = ({ title, imageUrl, details, startDateLabel = null }) => {

    const isDateThisWeek = (date) => {
        const today = new Date();
        const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 })
        const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 })
        return isWithinInterval(date, { start: currentWeekStart, end: currentWeekEnd })
    }

    return (
        <div className="flex flex-col justify-between items-center w-full">

            <div className="w-full aspect-square overflow-hidden flex-none rounded-xl relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover rounded-xl"
                />

                {startDateLabel && (
                    <span className="absolute top-2 right-1 bg-dark-red text-white 
                                    text-xs font-semibold px-2 py-2 rounded shadow-card">
                        {isDateThisWeek(startDateLabel)
                            ? `Opens ${format(startDateLabel, "EEEE")}`
                            : format(startDateLabel, "EEE, MMM dd, yyyy")}
                    </span>
                )}

            </div>

            <div className="w-full mt-2 flex flex-col items-start">
                <h1 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-neutral-800 line-clamp-1">
                    {title}
                </h1>
                <div className="flex justify-start gap-1 sm:gap-1.5 md:gap-2 text-xs sm:text-sm md:text-base font-regular text-neutral-500">
                    {details.map((detail, index) =>
                        <span key={index}>{detail}</span>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Card;