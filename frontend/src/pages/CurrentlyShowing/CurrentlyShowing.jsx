import { useState, useEffect } from "react";
import { filterMovieProjections } from "../../services/movieProjectionService"
import { getCurrentlyShowingMovies } from "../../services/movieService";
import { getCities } from "../../services/cityService";
import { getGenres } from "../../services/genreService";
import { getAllVenues } from "../../services/venueService";
import { times } from "../../data/timesData";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Select from "../../components/Select/Select";
import DatePicker from "../../components/DatePicker/DatePicker";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useSearchParams } from "react-router-dom";

const CurrentlyShowing = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentMovies, setCurrentMovies] = useState({
        content: [],
        number: 0,
        size: 0,
        hasNext: false,
        hasPrevious: false,
        totalElements: 0,
        totalPages: 0
    })

    const [projections, setProjections] = useState({})

    const [venues, setVenues] = useState({ content: [] })
    const [cities, setCities] = useState([])
    const [genres, setGenres] = useState([])

    const page = Number(searchParams.get("page") || 0)
    const size = searchParams.get("size") || 5
    const searchTitle = searchParams.get("title") || ""
    const selectedCity = searchParams.get("city") || ""
    const selectedVenue = searchParams.get("venue") || ""
    const selectedGenre = searchParams.get("genre") || ""
    const selectedTime = searchParams.get("time") || ""
    const selectedDate = searchParams.get("date") || new Date().toLocaleDateString('sv-SE')

    useEffect(() => {
        if (!searchParams.get("page")) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("date", new Date().toLocaleDateString('sv-SE'));
            newParams.set("page", 0);
            newParams.set("size", 5);
            setSearchParams(newParams);
        }
        fetchCities();
        fetchVenues();
        fetchGenres();
    }, []);

    useEffect(() => {
        fetchCurrentlyShowing();
    }, [searchParams]);

    const fetchCurrentlyShowing = async () => {
        try {
            const params = {
                title: searchTitle,
                city: selectedCity,
                venue: selectedVenue,
                genre: selectedGenre,
                date: selectedDate,
                time: selectedTime,
                page,
                size
            }

            const res = await getCurrentlyShowingMovies(params);

            setCurrentMovies(previousMovies => page === 0
                ? res
                : { ...res, content: [...previousMovies.content, ...res.content] })

            fetchMovieProjections(res.content)
        } catch (error) {
            console.log(error)
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

    const fetchVenues = async ( page = 0, size = 100 ) => {
        try {
            const res = await getAllVenues({page, size})
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

    const fetchMovieProjections = async (movies) => {
        try {

            let venue = null
            if(selectedVenue && venues.content.length > 0 )
                venue = venues.content.find(v => v.name === selectedVenue)

            for (const movie of movies) {
                const params = { 
                    movieId: movie.id, 
                    projectionDate: selectedDate, 
                    venue: venue?.id || null
                }

                const res = await filterMovieProjections(params);
                
                const unique = Array.from(
                    new Map(res.map(p => [p.projectionTime, p])).values()
                );

                setProjections(previousProjections => (
                    { ...previousProjections, [movie.id]: unique || [] }
                ));
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleLoadMore = () => {
        const newParams = new URLSearchParams(searchParams);

        newParams.set("page", page + 1);
        setSearchParams(newParams);
    }

    const updateParam = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value)
            newParams.set(key, value);
        else
            newParams.delete(key)

        newParams.set("page", 0);
        setSearchParams(newParams);
    }

    return (
        <div className="flex flex-col gap-4 px-6 md:px-14 py-4 md:py-5 bg-neutral-25">

            <h1
                className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-800">
                Currently Showing
                {currentMovies.content.length > 0 ? ("(" + currentMovies.totalElements + ")") : ""}
            </h1>

            <SearchInput
                text={"Search movies"}
                selectedValue={searchTitle}
                onChange={(value) => { updateParam("title", value) }} />

            <div
                className="flex flex-col gap-4 items-center justify-center 
                            sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-row lg:gap-6">
                <Select
                    items={cities}
                    selectText="All cities"
                    icon={faLocationDot}
                    selectedValue={selectedCity}
                    onChange={(value) => { updateParam("city", value) }}
                />
                <Select
                    items={venues?.content}
                    selectText="All cinemas"
                    icon={faLocationDot}
                    selectedValue={selectedVenue}
                    onChange={(value) => { updateParam("venue", value) }}
                />
                <Select
                    items={genres}
                    selectText="All genres"
                    icon={faLocationDot}
                    selectedValue={selectedGenre}
                    onChange={(value) => { updateParam("genre", value) }}
                />
                <Select
                    items={times.map(time => ({ id: time, name: time }))}
                    selectText="All projections"
                    icon={faClock}
                    selectedValue={selectedTime}
                    onChange={(value) => { updateParam("time", value) }} />
            </div>

            <DatePicker
                selectedValue={selectedDate}
                onChange={(value) => { updateParam("date", value) }}
            />

            <h1 className="font-normal italic text-neutral-500 text-xs md:text-sm lg:text-base">
                Quick reminder that our cinema schedule is on a ten-day update cycle.
            </h1>

            <MovieDetails
                movies={currentMovies.content}
                projections={projections}
            />

            {currentMovies.hasNext && currentMovies.content.length > 0 && (
                <button
                    onClick={handleLoadMore}
                    className="flex justify-center text-urbanist text-dark-red 
                        text-semibold text-sm sm:text-base md:text-lg lg:text-lg underline">
                    Load more
                </button>
            )}

        </div>
    );
}

export default CurrentlyShowing;