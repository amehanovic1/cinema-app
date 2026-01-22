import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getVenuesByCityId } from "../../services/venueService";
import { getCities } from "../../services/cityService";
import { getGenres } from "../../services/genreService";
import { getUpcomingMovies } from "../../services/movieService";
import { faLocationDot, faBuilding, faVideo, faFilm } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../../components/SearchInput/SearchInput";
import Select from "../../components/Select/Select";
import Card from "../../components/Card/Card";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import { format } from "date-fns"
import { isDateThisWeek } from "../../utils/dateTimeUtils";
import { ROUTES } from "../../routes/routes";
import { CardSkeleton } from "../../components/Card/CardSkeleton";

const UpcomingMovies = () => {
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const [upcomingMovies, setUpcomingMovies] = useState({
        content: [],
        number: 0,
        size: 0,
        hasNext: false,
        hasPrevious: false,
        totalElements: 0,
        totalPages: 0
    })
    const [venues, setVenues] = useState([])
    const [cities, setCities] = useState([])
    const [genres, setGenres] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const page = Number(searchParams.get("page") || 0)
    const size = searchParams.get("size") || 4
    const searchTitle = searchParams.get("title") || ""
    const selectedCity = searchParams.get("city") || ""
    const selectedVenue = searchParams.get("venue") || ""
    const selectedGenre = searchParams.get("genre") || ""
    const selectedStartDate = searchParams.get("startDate") || ""
    const selectedEndDate = searchParams.get("endDate") || ""

    useEffect(() => {
        if (!searchParams.get("page")) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", 0);
            newParams.set("size", 4);
            setSearchParams(newParams);
        }
        fetchCities();
        fetchGenres();
    }, []);

    useEffect(() => {
        fetchUpcoming();
        fetchVenues();
    }, [searchParams]);


    const fetchUpcoming = async () => {
        try {
            setIsLoading(true);

            const city = cities.find(c => c.name === selectedCity);
            const venue = venues.find(v => v.name === selectedVenue);
            const genre = genres.find(g => g.name === selectedGenre);

            const params = {
                title: searchTitle,
                cityId: city?.id,
                venueId: venue?.id,
                genreId: genre?.id,
                startDate: selectedStartDate,
                endDate: selectedEndDate,
                page,
                size
            }

            const res = await getUpcomingMovies(params);

            setUpcomingMovies(upcomingMovies => page === 0
                ? res
                : { ...res, content: [...upcomingMovies.content, ...res.content] })

        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => setIsLoading(false), 200);
        }
    }

    const fetchCities = async () => {
        try {
            const res = await getCities();
            setCities(res);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchVenues = async () => {
        try {
            if (!selectedCity) {
                setVenues([]);
                return;
            }
            const city = cities.find(c => c.name === selectedCity);
            const res = await getVenuesByCityId({ cityId: city?.id })
            setVenues(res);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchGenres = async () => {
        try {
            const res = await getGenres();
            setGenres(res);
        } catch (error) {
            console.log(error)
        }
    }

    const updateParam = (params) => {
        const newParams = new URLSearchParams(searchParams);

        Object.entries(params).forEach(([key, value]) => {
            if (value)
                newParams.set(key, value);
            else
                newParams.delete(key)
        });

        newParams.set("page", 0);
        setSearchParams(newParams);
    }

    const handleLoadMore = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", page + 1);
        setSearchParams(newParams);
    }

    const getMovieImage = (movie, type = "poster") => {
        return movie.images?.find(img => img.type === type)?.url || "";
    }

    return (
        <div className="flex flex-col gap-4 px-6 md:px-14 py-4 md:py-5 bg-neutral-25" data-testid="upcoming-movies-page">
            <h1
                className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-800"
                data-testid="upcoming-movies-title"
            >
                Upcoming Movies
                {upcomingMovies.content.length > 0 ? (
                    <span data-testid="upcoming-total-count">({upcomingMovies.totalElements})</span>
                ) : ""}
            </h1>

            <SearchInput
                text={"Search movies"}
                selectedValue={searchTitle}
                onChange={(value) => { updateParam({ title: value }) }}
            />

            <div
                data-testid="filters-section"
                className="flex flex-col gap-4 items-center justify-center 
                            sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-row lg:gap-6">

                <div data-testid="city-filter-wrapper" className="w-full">
                    <Select
                        items={cities}
                        selectText="All cities"
                        icon={faLocationDot}
                        selectedValue={selectedCity}
                        onChange={(value) => { updateParam({ city: value, venue: "" }) }}
                    />
                </div>

                <div data-testid="cinema-filter-wrapper" className="w-full">
                    <Select
                        items={venues}
                        selectText="All cinemas"
                        icon={faBuilding}
                        selectedValue={selectedVenue}
                        onChange={(value) => { updateParam({ venue: value }) }}
                    />
                </div>

                <div data-testid="genre-filter-wrapper" className="w-full">
                    <Select
                        items={genres}
                        selectText="All genres"
                        icon={faVideo}
                        selectedValue={selectedGenre}
                        onChange={(value) => { updateParam({ genre: value }) }}
                    />
                </div>

                <DateRangePicker
                    initialStartDate={selectedStartDate}
                    initialEndDate={selectedEndDate}
                    onChangeSet={({ start, end }) => updateParam({ startDate: start, endDate: end })}
                />
            </div>

            {isLoading || upcomingMovies.content.length > 0
                ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" data-testid="upcoming-movies-grid">
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-neutral-0 border border-neutral-200 rounded-2xl shadow-card p-2">
                                <CardSkeleton />
                            </div>
                        ))
                        : upcomingMovies.content.map((movie) =>
                            <div
                                key={movie.id}
                                className="bg-neutral-0 border border-neutral-200 rounded-2xl shadow-card flex justify-center p-2"
                            >

                                <Card
                                    title={movie.title}
                                    imageUrl={getMovieImage(movie)}
                                    details={[`${movie.durationInMinutes} MIN`, "|", movie.genres?.[0]?.name]}
                                    badge={
                                        isDateThisWeek(movie.projectionStartDate)
                                            ? `Opens ${format(movie.projectionStartDate, "EEEE")}`
                                            : format(movie.projectionStartDate, "EEE, MMM dd, yyyy")
                                    }
                                    onClick={() => navigate(ROUTES.MOVIE_DETAILS.replace(':movieId', movie.id))}
                                />
                            </div>
                        )}
                </div>
                ) : <NoDataFound
                    icon={faFilm}
                    title={"No movies to preview for current range"}
                    text={"We are working on updating our schedule for upcoming movies. Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!"}
                    actionText={"Explore Upcoming Movies"}
                />
            }

            {upcomingMovies.hasNext && upcomingMovies.content.length > 0 &&
                <button
                    data-testid="upcoming-load-more-button"
                    onClick={handleLoadMore}
                    className="flex justify-center text-urbanist text-dark-red 
                                text-semibold text-sm sm:text-base md:text-lg lg:text-lg underline">
                    Load more
                </button>
            }

        </div>
    );
}

export default UpcomingMovies;