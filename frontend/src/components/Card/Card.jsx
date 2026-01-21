const Card = ({ title, imageUrl, details = null, badge = null, onClick = null }) => {
    
    const formattedTitle = (title || "").toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, "");

    return (
        <div
            className={`flex flex-col justify-between items-center w-full 
                        ${onClick ? "cursor-pointer" : ""}`}
            onClick={onClick}
            data-testid={`card-${formattedTitle}`}
        >

            <div className="w-full aspect-square overflow-hidden flex-none rounded-xl relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover rounded-xl"
                    data-testid={`card-img-${formattedTitle}`}
                />

                {badge && (
                    <span
                        className="absolute top-2 right-1 bg-dark-red text-white text-xs font-semibold px-2 py-2 rounded shadow-card"
                        data-testid={`card-badge-${formattedTitle}`}
                    >
                        {badge}
                    </span>
                )}

            </div>

            <div className="w-full mt-2 flex flex-col items-start" data-testid="card-content">
                <h1
                    className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-neutral-800 line-clamp-1"
                    data-testid={`card-title-${formattedTitle}`}
                >
                    {title}
                </h1>

                {details &&
                    <div
                        className="flex justify-start gap-1 sm:gap-1.5 md:gap-2 text-xs sm:text-sm md:text-base font-regular text-neutral-500"
                        data-testid={`card-details-group-${formattedTitle}`}
                    >
                        {details.map((detail, index) =>
                            <span 
                            key={index} 
                            data-testid={`movie-card-detail-item-${formattedTitle}-${index}`}
                            >
                                {detail}
                            </span>
                        )}
                    </div>
                }
            </div>

        </div>
    );
}

export default Card;