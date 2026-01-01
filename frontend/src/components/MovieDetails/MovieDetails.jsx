import NoDataFound from "../NoDataFound/NoDataFound";
import { formatDate, formatTime } from "../../utils/dateTimeFormatter";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

const MovieDetails = ({ movies, projections, onClick }) => {

    const getLanguageName = (languageCode) => {
        const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
        return displayNames.of(languageCode);
    }

    return (
        <>
            {movies.length > 0 ? (
                movies.map(movie => (
                    <div
                        key={movie.id}
                        className={`flex flex-col mb-6 bg-neutral-0 border border-neutral-200 
                                    rounded-3xl shadow-card ${onClick ? "cursor-pointer" : ""}`}
                        onClick={() => onClick && onClick(movie)}>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 px-4">

                            <div className="md:col-span-3 flex aspect-square overflow-hidden rounded-xl">
                                <img
                                    src={movie.images?.find(img => img.type === "poster")?.url}
                                    alt={movie.title}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>

                            <div className="md:col-span-4 flex flex-col justify-between text-neutral-800 
                                            font-normal text-xs sm:text-sm md:text-base">
                                <div>
                                    <h1 className="font-bold text-lg md:text-xl lg:text-2xl mb-1">{movie.title}</h1>
                                    <div className="flex flex-wrap gap-3">
                                        <span>{movie.pgRating}</span>
                                        <span className="text-dark-red">|</span>
                                        <span>{getLanguageName(movie.language)}</span>
                                        <span className="text-dark-red">|</span>
                                        <span>{movie.durationInMinutes} Min </span>
                                    </div>

                                    <div className="flex gap-4 mt-2 flex-wrap">
                                        {movie.genres?.map(genre => (
                                            <button
                                                key={genre.id}
                                                className="bg-neutral-200 text-sm px-2 py-1 rounded-lg" >
                                                {genre.name}
                                            </button>))
                                        }
                                    </div>
                                </div>

                                <h1 className="text-neutral-500 text-xs md:text-base italic">
                                    Playing in cinema until {formatDate(movie.projectionEndDate)}.
                                </h1>
                            </div>

                            <div className="md:col-span-5 flex flex-col">
                                <h1 className="text-dark-red font-bold text:base md:text-xl lg:text-xl">Showtimes</h1>
                                <div className="flex gap-4 flex-wrap mt-2">
                                    {projections[movie.id]?.map(projection => (
                                        <button
                                            key={projection.id}
                                            className="border border-neutral-200 rounded-lg px-3 py-2 
                                                        hover:bg-dark-red hover:text-neutral-0 transition 
                                                        font-bold text-sm lg:text-base"
                                        >
                                            {formatTime(projection.projectionTime)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>))
            ) : (
                <NoDataFound
                    icon={faFilm}
                    title={"No movies to preview for current date"}
                    text={"We are working on updating our schedule for upcoming movies. Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!"}
                    actionText={"Explore Upcoming Movies"}
                />
            )}
        </>
    );
}

export default MovieDetails;