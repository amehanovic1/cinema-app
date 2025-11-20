import { useState, useEffect } from "react";
import { getMovieById } from "../../services/movieProjectionService"
import { getCurrentlyShowingMovies } from "../../services/movieService";
import { getCities } from "../../services/cityService";
import { getAllVenues } from "../../services/venueService";
import { getGenres } from "../../services/genreService";
import { times } from "../../data/timesData";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../components/Dropdown/Dropdown";
import DatePicker from "../../components/DatePicker/DatePicker";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import SearchInput from "../../components/SearchInput/SearchInput";

const CurrentlyShowing = () => {
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
    const [page, setPage] = useState(0)

    const [venues, setVenues] = useState({ content: [] })
    const [cities, setCities] = useState([])
    const [genres, setGenres] = useState([])

    const [searchTitle, setSearchTitle] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedVenue, setSelectedVenue] = useState("")
    const [selectedGenre, setSlectedGenre] = useState("")
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date()
        return today.toLocaleDateString('sv-SE')
    })

    useEffect(() => {
        fetchCities();
        fetchVenues();
        fetchGenres();
    }, []);

    useEffect(() => {
        setPage(0);
        fetchCurrentlyShowing(0);
    }, [searchTitle, selectedCity, selectedVenue, selectedGenre, selectedDate, selectedTime]);

    useEffect(() => {
        fetchCurrentlyShowing(page);
    }, [page]);

    const fetchCurrentlyShowing = async (pageNum = page, size = 1) => {
        try {
            const params = {
                title: searchTitle,
                city: selectedCity,
                venue: selectedVenue,
                genre: selectedGenre,
                date: selectedDate,
                time: selectedTime,
                page: pageNum,
                size: size
            }

            const res = await getCurrentlyShowingMovies(params);

            setCurrentMovies(previousMovies => pageNum === 0
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

    const fetchVenues = async (page = 0, size = 100) => {
        try {
            const res = await getAllVenues({ page, size });
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
            for (const movie of movies) {
                const res = await getMovieById(movie.id, selectedDate);
                setProjections(previousProjections => ({ ...previousProjections, [movie.id]: res }));
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleLoadMore = () => {
        setPage(currentPage => currentPage + 1);
    }

    return (
        <div className="flex flex-col gap-4 px-6 md:px-14 py-4 md:py-5 bg-neutral-25">

            <h1
                className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-800">
                Currently Showing
                {currentMovies.content.length > 0 ? ("(" + currentMovies.content.length + ")") : ""}
            </h1>

            <SearchInput text={"Search movies"} onChange={setSearchTitle} />

            <div
                className="flex flex-col gap-4 items-center justify-center 
                            sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-row lg:gap-6">
                <Dropdown
                    items={cities}
                    selectText="All cities"
                    icon={faLocationDot}
                    onChange={setSelectedCity}
                />
                <Dropdown
                    items={venues?.content}
                    selectText="All cinemas"
                    icon={faLocationDot}
                    onChange={setSelectedVenue}
                />
                <Dropdown
                    items={genres}
                    selectText="All genres"
                    icon={faLocationDot}
                    onChange={setSlectedGenre}
                />
                <Dropdown
                    items={times.map(time => ({ id: time, name: time }))}
                    selectText="All projections"
                    icon={faClock}
                    onChange={setSelectedTime} />
            </div>

            <DatePicker onChange={setSelectedDate} />

            <h1 className="font-normal italic text-neutral-500 text-xs md:text-sm lg:text-base">
                Quick reminder that our cinema schedule is on a ten-day update cycle.
            </h1>

            <MovieDetails movies={currentMovies.content} projections={projections} />

            {currentMovies.hasNext && currentMovies.content.length > 0 && (
                <button
                    onClick={handleLoadMore}
                    className="flex justify-center text-urbanist text-dark-red 
                        text-semibold text-sm sm:text-base md:text-lg lg:text-lg underline">
                    Load more
                </button>
            )
            }

        </div>
    );
}

export default CurrentlyShowing;