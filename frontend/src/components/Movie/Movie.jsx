const Movie = ({ movie }) => {

    const genre = movie.genres?.[0]?.name || 'Unknown';
    const poster = movie.images?.find(img => img.type === "poster")?.url;

    return (
        <div className="h-[395px] w-[300px] bg-neutral-0 border border-neutral-200 rounded-[24px] shadow-card">

            <div className="flex flex-col justify-center items-center p-2">

                <img
                    src={poster}
                    alt="Movie url"
                    className="h-[287px] w-[270px] object-cover rounded-[16px]"
                />

                <div className="w-full flex flex-col items-start">
                    <h1 className="font-bold text-[20px] text-neutral-800">{movie.title}</h1>
                    <div className="flex justify-start gap-2 font-regular text-[14px] text-neutral-500">
                        <h2>{movie.durationInMinutes} MIN</h2>
                        <span className="text-neutral-400">|</span>
                        <h2>{genre}</h2>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Movie;