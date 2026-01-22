import { useCallback, useContext, useEffect, useState } from "react";
import { getCurrentlyShowingMovies, getMovieDetails } from "../../services/movieService";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ContentSection from "../../components/ContentSection/ContentSection";
import Card from "../../components/Card/Card";
import DatePicker from "../../components/DatePicker/DatePicker";
import { faLocationDot, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { getCities } from "../../services/cityService";
import { getVenuesByCityId } from "../../services/venueService";
import Select from "../../components/Select/Select";
import { filterMovieProjections } from "../../services/movieProjectionService";
import { formatTime } from "../../utils/dateTimeFormatter";
import { ROUTES } from "../../routes/routes";
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import AuthContext from "../../context/AuthContext";
import AuthDrawer from "../AuthDrawer/AuthDrawer";
import { formatForId } from "../../utils/testUtils";

const MovieDetails = () => {
    const navigate = useNavigate()
    const { movieId } = useParams()
    const { user } = useContext(AuthContext)
    const [authDrawerOpen, setAuthDrawerOpen] = useState(false)

    const [movie, setMovie] = useState(null)
    const [venues, setVenues] = useState([])
    const [cities, setCities] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('sv-SE'))
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedVenue, setSelectedVenue] = useState("")
    const [selectedProjection, setSelectedProjection] = useState(null);

    const [currentMovies, setCurrentMovies] = useState({})
    const [projections, setProjections] = useState({})

    const [isLoadingMovie, setIsLoadingMovie] = useState(true)
    const [isLoadingInitialData, setIsLoadingInitialData] = useState(true)

    useEffect(() => {
        if (!movieId) return;

        const fetchMovieDetails = async () => {
            try {
                setIsLoadingMovie(true);

                setMovie(null);
                setSelectedCity("");
                setSelectedVenue("");
                setSelectedProjection("");
                setVenues([])
                setProjections({});

                const res = await getMovieDetails(movieId);
                setMovie(res);
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => setIsLoadingMovie(false), 200);
            }
        }

        fetchMovieDetails();
    }, [movieId])

    useEffect(() => {
        if (!movie) return;

        const fetchInitialData = async () => {
            try {
                setIsLoadingInitialData(true);

                const [cities, currentMovies] = await Promise.all([
                    getCities(),
                    getCurrentlyShowingMovies({ page: 0, size: 6 })

                ]);
                setCities(cities);
                setCurrentMovies(currentMovies);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoadingInitialData(false);
            }
        }

        fetchInitialData();
    }, [movie])

    useEffect(() => {
        setSelectedVenue("")
        setSelectedProjection("")

        if (!selectedCity || !cities.length) {
            setVenues([]);
            return;
        }

        const city = cities.find(c => c.name === selectedCity);
        if (!city) return;

        const fetchVenues = async () => {
            try {

                const res = await getVenuesByCityId({ cityId: city?.id })
                setVenues(res);
            } catch (error) {
                console.log(error)
            }
        }

        fetchVenues();
    }, [selectedCity, cities])


    useEffect(() => {
        setSelectedProjection("");

        if (!movie) return;

        const city = cities.find(c => c.name === selectedCity);
        const venue = venues.find(v => v.name === selectedVenue);
        if (!city && selectedCity) return;

        const fetchMovieProjections = async () => {
            try {
                const params = {
                    movieId: movie.id,
                    projectionDate: selectedDate,
                    cityId: city?.id || null,
                    venueId: venue?.id || null
                }

                const res = await filterMovieProjections(params);

                setProjections(res || []);

            } catch (error) {
                console.log(error)
            }
        }

        fetchMovieProjections();
    }, [movie, selectedCity, selectedVenue, selectedDate])

    const fetchCurrentlyShowing = useCallback(async (page = 0, size = 6) => {
        try {
            const res = await getCurrentlyShowingMovies({ page, size });
            setCurrentMovies(res);
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleContinueToBooking = (action) => {
        if (user) {
            navigate(`/movie-ticket-booking/${selectedProjection.id}/seats/${action}`);
        } else {
            setAuthDrawerOpen(true);
        }
    };

    const getLanguageName = (languageCode) => {
        const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
        return displayNames.of(languageCode);
    }

    const getMovieImagesByType = (type) => {
        return movie?.images?.filter(img => img.type === type) || [];
    };

    const extraImages = getMovieImagesByType("extra");

    const renderExtraImages = () => {
        return extraImages.map((img, index) => (
            <img
                key={img.id || index}
                src={img.url}
                alt={`Extra ${index + 1}`}
                className={`w-full h-full object-cover ${index === 1 ? 'rounded-tr-xl' : index === 3 ? 'rounded-br-xl' : ''}`}
            />
        ));
    };

    return (
        <>
            {(isLoadingInitialData || isLoadingMovie)
                ? <MovieDetailsSkeleton />
                : movie ? (
                    <div className="flex flex-col gap-2 m-4 sm:m-6 md:m-8 lg:m-12" data-testid="movie-details-container">

                        <h1 className="text-neutral-800 font-bold text-2xl" data-testid="movie-details-header">
                            Movie Details
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="col-span-1">
                                <iframe
                                    data-testid="movie-details-trailer-video"
                                    className="w-full h-full aspect-video rounded-tl-xl rounded-bl-xl"
                                    src={`https://www.youtube.com/embed/${movie.trailerUrl.split("v=")[1]}`}
                                    title="Trailer Url"
                                    frameBorder="0">
                                </iframe>
                            </div>

                            <div className="col-span-1 grid grid-cols-2 gap-2" data-testid="movie-details-image-gallery">
                                {renderExtraImages()}
                            </div>

                            <div className="col-span-1 flex flex-col gap-4">
                                <h1 className="font-bold text-neutral-800 text-3xl" data-testid="movie-details-title">
                                    {movie.title}
                                </h1>

                                <div className="flex flex-wrap gap-3 text-neutral-800 text-base font-normal" data-testid="movie-details-info">
                                    <span data-testid="movie-details-pg-rating">{movie.pgRating}</span>
                                    <span className="text-dark-red">|</span>
                                    <span data-testid="movie-details-language">{getLanguageName(movie.language)}</span>
                                    <span className="text-dark-red">|</span>
                                    <span data-testid="movie-details-duration">{movie.durationInMinutes} Min </span>
                                    <span className="text-dark-red">|</span>
                                    <div data-testid="movie-details-projection-dates">
                                        Projection date:
                                        <span data-testid="movie-details-start-date" className="ml-1"> {format(movie.projectionStartDate, "yyyy/MM/dd")} </span>
                                        -
                                        <span data-testid="movie-details-end-date"> {format(movie.projectionEndDate, "yyyy/MM/dd")} </span>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-2 flex-wrap" data-testid="movie-details-genres-list">
                                    {movie.genres?.map(genre => (
                                        <button
                                            key={genre.id}
                                            data-testid={`genre-tag-${formatForId(genre.name)}`}
                                            className="bg-neutral-200 text-sm text-neutral-700 font-normal px-2 py-1 rounded-lg" >
                                            {genre.name}
                                        </button>))
                                    }
                                </div>

                                <p className="text-neutral-800 font-regular text-base" data-testid="movie-details-synopsis">
                                    {movie.synopsis}
                                </p>

                                <h1 className="text-neutral-500 font-regular text-base" data-testid="movie-details-director-container">
                                    Director: <span className="text-neutral-800" data-testid="movie-details-director-name">
                                        {movie.directorFullName}
                                    </span>
                                </h1>

                                <h1
                                    className="text-neutral-500 font-regular text-base flex flex-wrap gap-x-2"
                                    data-testid="movie-details-writers-container"
                                >
                                    Writers:
                                    <span className="flex flex-wrap text-neutral-800" data-testid="movie-details-writers-names">
                                        {movie.writers?.map((w, index) => (
                                            <span
                                                key={index}
                                                data-testid={`writer-name-${formatForId(`${w.firstName} ${w.lastName}`)}`}
                                                className="after:content-[','] last:after:content-[''] mr-1"
                                            >
                                                {w.firstName} {w.lastName}
                                            </span>
                                        ))}
                                    </span>
                                </h1>

                                <h1 className="text-neutral-500 font-bold text-xl">
                                    <span className="text-dark-red">| </span>Cast
                                </h1>

                                <div className="grid gap-4 mt-2 grid-cols-3" data-testid="movie-details-cast-grid">
                                    {movie.cast?.map(c => {
                                        const castMemberId = formatForId(`${c.firstName} ${c.lastName}`);
                                        return (
                                            <div
                                                key={c.id}
                                                className="rounded-lg flex flex-col items-start"
                                                data-testid={`cast-member-card-${castMemberId}`}
                                            >
                                                <div className="font-semibold text-sm text-neutral-900" data-testid={`cast-member-name-${castMemberId}`}>
                                                    {c.firstName} {c.lastName}
                                                </div>
                                                <div className="font-regular text-xs text-neutral-700">
                                                    {c.characterFullName}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <h1 className="text-neutral-500 font-bold text-xl">
                                    <span className="text-dark-red">| </span>Rating
                                </h1>

                                <div className="flex flex-wrap gap-4 mt-2" data-testid="movie-ratings-container">
                                    {movie.ratings?.map(r => {
                                        const sourceId = formatForId(r.source);

                                        return (
                                            <div
                                                key={r.id}
                                                className="p-2 max-w-[140px] border border-neutral-200 rounded-lg flex items-center gap-2"
                                                data-testid={`rating-card-${sourceId}`}
                                            >
                                                <FontAwesomeIcon icon={faStar} className="text-dark-red" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold text-sm" data-testid={`rating-value-${formatForId(sourceId)}`}>{r.value}</div>
                                                    <div className="font-regular text-xs text-neutral-500" data-testid={`rating-source-name-${sourceId}`}>{r.source}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                            </div>


                            <div className="flex flex-col gap-4 p-4 border border-neutral-200 rounded-xl shadow-text" data-testid="movie-details-booking-section">
                                <div
                                    className="flex flex-col gap-4 items-center justify-center sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-row lg:gap-6">
                                    <div data-testid="city-select-wrapper" className="w-full">
                                        <Select
                                            items={cities}
                                            selectText="Choose city"
                                            icon={faLocationDot}
                                            selectedValue={selectedCity}
                                            onChange={(value) => setSelectedCity(value)}
                                        />
                                    </div>

                                    <div data-testid="cinema-select-wrapper" className="w-full">
                                        <Select
                                            items={venues}
                                            selectText="Choose Cinema"
                                            icon={faBuilding}
                                            selectedValue={selectedVenue}
                                            onChange={(value) => setSelectedVenue(value)}
                                        />
                                    </div>
                                </div>

                                <DatePicker
                                    selectedValue={selectedDate}
                                    onChange={(value) => setSelectedDate(value)}
                                />

                                {projections.length > 0 ? (
                                    <div data-testid="movie-details-projection-list-section">
                                        <h1 className="text-neutral-800 font-bold text:base md:text-xl lg:text-xl">
                                            Standard
                                        </h1>

                                        <div className="flex gap-4 flex-wrap mt-2" data-testid="movie-details-projection-list">
                                            {projections.map(projection => (
                                                <button
                                                    key={projection.id}
                                                    data-testid={`projection-time-${formatForId(formatTime(projection.projectionTime))}`}
                                                    onClick={() => setSelectedProjection(projection)}
                                                    className={`border rounded-lg px-3 py-2 font-bold text-sm lg:text-base transition 
                                                            ${projection.id === selectedProjection?.id
                                                            ? "bg-dark-red text-white"
                                                            : "border-neutral-200 hover:bg-dark-red hover:text-white"
                                                        }`}
                                                >
                                                    {formatTime(projection.projectionTime)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-neutral-600 italic" data-testid="movie-details-no-projections-message">
                                        No projections available for the selected date.
                                    </p>
                                )}

                                <div className="mt-auto">

                                    <hr className="mt-auto mb-2 bg-neutral-700" />

                                    <div className="flex gap-2">
                                        <button
                                            data-testid="movie-details-reserve-ticket-button"
                                            className={`w-1/2 mb-4 font-bold py-2 px-2 border border-dark-red rounded-lg transition
                                                    ${selectedCity && selectedVenue && selectedProjection
                                                    ? "bg-neutral-0 text-dark-red"
                                                    : "border-neutral-200 bg-neutral-200 text-neutral-500 cursor-not-allowed"
                                                }`}
                                            disabled={!(selectedCity && selectedVenue && selectedProjection)}
                                            onClick={() => handleContinueToBooking("reserve")}
                                        >
                                            Reserve Ticket
                                        </button>

                                        <button
                                            data-testid="movie-details-buy-ticket-button"
                                            className={`w-1/2 mb-4 font-bold py-2 px-2 border border-dark-red rounded-lg transition
                                                    ${selectedCity && selectedVenue && selectedProjection
                                                    ? "bg-dark-red text-neutral-0"
                                                    : "border-neutral-200 bg-neutral-200 text-neutral-500 cursor-not-allowed"
                                                }`}
                                            disabled={!(selectedCity && selectedVenue && selectedProjection)}
                                            onClick={() => handleContinueToBooking("payment")}
                                        >
                                            Buy Ticket
                                        </button>
                                    </div>

                                </div>


                            </div>

                        </div>

                        <div className="mt-4" data-testid="movie-details-see-also-section">
                            <ContentSection
                                title="See Also"
                                items={currentMovies}
                                getAll={fetchCurrentlyShowing}
                                renderItem={(movie) =>
                                    <Card
                                        title={movie.title}
                                        imageUrl={movie.images?.find(img => img.type === "poster")?.url || ""}
                                        onClick={() => navigate(ROUTES.MOVIE_DETAILS.replace(':movieId', movie.id))}
                                    />
                                }
                            />
                        </div>

                        {authDrawerOpen &&
                            <div data-testid="auth-drawer-wrapper">
                                <AuthDrawer onClose={() => setAuthDrawerOpen(false)} />
                            </div>
                        }
                    </div>
                ) : (
                    <NoDataFound
                        icon={faFilm}
                        title={"Movie not found"}
                        text={"We are working on updating our schedule for upcoming movies. Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!"}
                    />
                )}
        </>
    );
}

export default MovieDetails;