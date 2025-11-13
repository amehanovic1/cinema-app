const Venue = ({ venue }) => {
    return (
        <div className="h-[395px] w-[300px] bg-neutral-0 border border-neutral-200 rounded-[24px] shadow-card">

            <div className="flex flex-col justify-center items-center p-2">
                <img
                    src={venue.imageUrl}
                    alt="Venue"
                    className="h-[287px] w-[270px] object-cover rounded-[16px]"
                />
                <div className="w-full flex flex-col items-start">
                    <h1 className="font-bold text-[20px] text-neutral-800">
                        {venue.name}
                    </h1>
                    <h1 className="font-regular text-[14px] text-neutral-500">
                        {venue.street + ",  " + venue.city?.name}
                    </h1>
                </div>
            </div>

        </div>
    );
}

export default Venue;