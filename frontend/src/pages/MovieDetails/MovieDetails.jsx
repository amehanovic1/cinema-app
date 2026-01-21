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

    const extraImages = getMovieImagesByType("extra").slice(0, 4)

    return (
        <>
            {(isLoadingInitialData || isLoadingMovie)
                ? <MovieDetailsSkeleton />
                : movie ? (
                    <div className="flex flex-col gap-2 m-4 sm:m-6 md:m-8 lg:m-12">

                        <h1 className="text-neutral-800 font-bold text-2xl">
                            Movie Details
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="col-span-1">
                                <iframe
                                    className="w-full h-full aspect-video rounded-tl-xl rounded-bl-xl"
                                    src={`https://www.youtube.com/embed/${movie.trailerUrl.split("v=")[1]}`}
                                    title="Trailer Url"
                                    frameBorder="0">
                                </iframe>
                            </div>

                            <div className="col-span-1 grid grid-cols-2 gap-2">
                                <img src={extraImages[0]?.url} alt="Extra 1" className="w-full h-full object-cover" />
                                <img src={extraImages[1]?.url} alt="Extra 2" className="w-full h-full object-cover rounded-tr-xl" />
                                <img src={extraImages[2]?.url} alt="Extra 3" className="w-full h-full object-cover" />
                                <img src={extraImages[3]?.url} alt="Extra 4" className="w-full h-full object-cover rounded-br-xl" />
                            </div>

                            <div className="col-span-1 flex flex-col gap-4">
                                <h1 className="font-bold text-neutral-800 text-3xl">
                                    {movie.title}
                                </h1>

                                <div className="flex flex-wrap gap-3 text-neutral-800 text-base font-normal">
                                    <span>{movie.pgRating}</span>
                                    <span className="text-dark-red">|</span>
                                    <span>{getLanguageName(movie.language)}</span>
                                    <span className="text-dark-red">|</span>
                                    <span>{movie.durationInMinutes} Min </span>
                                    <span className="text-dark-red">|</span>
                                    Projection date: <span> {format(movie.projectionStartDate, "yyyy/MM/dd")} - {format(movie.projectionEndDate, "yyyy/MM/dd")} </span>
                                </div>

                                <div className="flex gap-4 mt-2 flex-wrap">
                                    {movie.genres?.map(genre => (
                                        <button
                                            key={genre.id}
                                            className="bg-neutral-200 text-sm text-neutral-700 font-normal px-2 py-1 rounded-lg" >
                                            {genre.name}
                                        </button>))
                                    }
                                </div>

                                <p className="text-neutral-800 font-regular text-base">
                                    {movie.synopsis}
                                </p>

                                <h1 className="text-neutral-500 font-regular text-base">
                                    Director: <span className="text-neutral-800">{movie.directorFullName}</span>
                                </h1>

                                <h1 className="text-neutral-500 font-regular text-base">
                                    Writers:{" "}
                                    <span className="text-neutral-800 ml-2">
                                        {movie.writers
                                            ?.map(w => `${w.firstName} ${w.lastName}`)
                                            .join(", ")}
                                    </span>
                                </h1>

                                <h1 className="text-neutral-500 font-bold text-xl">
                                    <span className="text-dark-red">| </span>Cast
                                </h1>

                                <div className="grid gap-4 mt-2 grid-cols-3">
                                    {movie.cast?.map(c => (
                                        <div key={c.id} className="rounded-lg flex flex-col items-start">
                                            <div className="font-semibold text-sm text-neutral-900">{c.firstName} {c.lastName}</div>
                                            <div className="font-regular text-xs text-neutral-700">{c.characterFullName}</div>
                                        </div>
                                    ))}
                                </div>

                                <h1 className="text-neutral-500 font-bold text-xl">
                                    <span className="text-dark-red">| </span>Rating
                                </h1>

                                <div className="flex flex-wrap gap-4 mt-2">
                                    {movie.ratings?.map(r => (
                                        <div key={r.id} className="p-2 max-w-[140px] border border-neutral-200 rounded-lg flex items-center gap-2">
                                            <FontAwesomeIcon icon={faStar} className="text-dark-red" />
                                            <div className="flex flex-col">
                                                <div className="font-semibold text-sm">{r.value}</div>
                                                <div className="font-regular text-xs text-neutral-500">{r.source}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>


                            <div className="flex flex-col gap-4 p-4 border border-neutral-200 rounded-xl shadow-text">
                                <div
                                    className="flex flex-col gap-4 items-center justify-center 
                                    sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-row lg:gap-6">
                                    <Select
                                        items={cities}
                                        selectText="Choose city"
                                        icon={faLocationDot}
                                        selectedValue={selectedCity}
                                        onChange={(value) => setSelectedCity(value)}
                                    />
                                    <Select
                                        items={venues}
                                        selectText="Choose Cinema"
                                        icon={faBuilding}
                                        selectedValue={selectedVenue}
                                        onChange={(value) => setSelectedVenue(value)}
                                    />
                                </div>

                                <DatePicker
                                    selectedValue={selectedDate}
                                    onChange={(value) => setSelectedDate(value)}
                                />

                                {projections.length > 0 ? (
                                    <>
                                        <h1 className="text-neutral-800 font-bold text:base md:text-xl lg:text-xl">
                                            Standard
                                        </h1>

                                        <div className="flex gap-4 flex-wrap mt-2">
                                            {projections.map(projection => (
                                                <button
                                                    key={projection.id}
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
                                    </>
                                ) : (
                                    <p className="text-neutral-600 italic">
                                        No projections available for the selected date.
                                    </p>
                                )}

                                <div className="mt-auto">

                                    <hr className="mt-auto mb-2 bg-neutral-700" />

                                    <div className="flex gap-2">
                                        <button className={`w-1/2 mb-4 font-bold py-2 px-2 border border-dark-red rounded-lg transition
                                            ${selectedCity && selectedVenue && selectedProjection
                                                ? "bg-neutral-0 text-dark-red"
                                                : "border-neutral-200 bg-neutral-200 text-neutral-500 cursor-not-allowed"
                                            }`}
                                            disabled={!(selectedCity && selectedVenue && selectedProjection)}
                                            onClick={() => handleContinueToBooking("reserve")}
                                        >
                                            Reserve Ticket
                                        </button>

                                        <button className={`w-1/2 mb-4 font-bold py-2 px-2 border border-dark-red rounded-lg transition
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

                        <div className="mt-4">
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
                            <AuthDrawer onClose={() => setAuthDrawerOpen(false)} />
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