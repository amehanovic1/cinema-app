const Movie = ({ movie }) => {

    const genre = movie.genres?.[0]?.name || 'Unknown';
    const poster = movie.images?.find(img => img.type === "poster")?.url;

    return (
        <div className="flex flex-col justify-between items-center w-full">

            <div className="w-full aspect-square overflow-hidden flex-none rounded-xl">
                <img
                    src={poster}
                    alt="Movie url"
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

            <div className="w-full mt-2 flex flex-col items-start">
                <h1 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-neutral-800 line-clamp-1">{movie.title}</h1>
                <div className="flex justify-start gap-1 sm:gap-1.5 md:gap-2 text-xs sm:text-sm md:text-base font-regular text-neutral-500">
                    <h1>{movie.durationInMinutes} MIN</h1>
                    <span className="text-neutral-400">|</span>
                    <h1>{genre}</h1>
                </div>
            </div>

        </div>
    );
}

export default Movie;