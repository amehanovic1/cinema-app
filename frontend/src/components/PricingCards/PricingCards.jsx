import SeatType from "../SeatType/SeatType";

const PricingCards = ({ seats }) => {
    return (
        <div className="flex flex-row gap-4 justify-center m-10 items-center">
            {seats.map((seat, index) => (

                <div
                    key={seat.id}
                    className={`flex flex-col justify-between items-center pt-4 border rounded-lg
                        ${seat.name === "Love"
                            ? "h-[500px] w-[350px] shadow-card"
                            : "h-[450px] w-[300px]"
                        }`}>

                    <SeatType key={seat.name} {...seat} />

                    <button
                        className={`mb-2 border p-1 rounded-lg 
                        ${seat.name === "Love"
                                ? "bg-dark-red border-neutral-25 text-neutral-25"
                                : "bg-neutral-25 border-dark-red text-dark-red"
                            }`}
                    >Explore Movies</button>
                </div>
            ))}
        </div>
    );
}

export default PricingCards;