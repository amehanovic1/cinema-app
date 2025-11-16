const Venue = ({ venue }) => {
    return (
        <div className="flex flex-col justify-between items-center w-full">

            <div className="w-full aspect-square overflow-hidden flex-none rounded-xl">
                <img
                    src={venue.imageUrl}
                    alt="Venue"
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

            <div className="w-full mt-2 flex flex-col items-start">
                <h1 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-neutral-800">
                    {venue.name}
                </h1>
                <h1 className="text-xs sm:text-sm md:text-base font-regular text-neutral-500">
                    {venue.street + ",  " + venue.city?.name}
                </h1>
            </div>


        </div>
    );
}

export default Venue;