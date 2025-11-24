import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVenues, getVenuesByCityName } from "../../services/venueService";
import { getCities } from "../../services/cityService";
import { getGenres } from "../../services/genreService";
import { getUpcomingMovies } from "../../services/movieService";
import { faLocationDot, faBuilding, faVideo, faFilm } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../../components/SearchInput/SearchInput";
import Select from "../../components/Select/Select";
import Card from "../../components/Card/Card";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";
import NoDataFound from "../../components/NoDataFound/NoDataFound";

const UpcomingMovies = () => {
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

            const params = {
                title: searchTitle,
                city: selectedCity,
                venue: selectedVenue,
                genre: selectedGenre,
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
            const res = await getVenuesByCityName({ cityName: selectedCity })
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
        <div className="flex flex-col gap-4 px-6 md:px-14 py-4 md:py-5 bg-neutral-25">
            <h1
                className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-800">
                Upcoming Movies
                {upcomingMovies.content.length > 0 ? ("(" + upcomingMovies.totalElements + ")") : ""}
            </h1>

            <SearchInput
                text={"Search movies"}
                selectedValue={searchTitle}
                onChange={(value) => { updateParam({ title: value }) }}
            />

            <div
                className="flex flex-col gap-4 items-center justify-center 
                            sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-row lg:gap-6">
                <Select
                    items={cities}
                    selectText="All cities"
                    icon={faLocationDot}
                    selectedValue={selectedCity}
                    onChange={(value) => { updateParam({ city: value }) }}
                />
                <Select
                    items={venues}
                    selectText="All cinemas"
                    icon={faBuilding}
                    selectedValue={selectedVenue}
                    onChange={(value) => { updateParam({ venue: value }) }}
                />
                <Select
                    items={genres}
                    selectText="All genres"
                    icon={faVideo}
                    selectedValue={selectedGenre}
                    onChange={(value) => { updateParam({ genre: value }) }}
                />

                <DateRangePicker
                    initialStartDate={selectedStartDate}
                    initialEndDate={selectedEndDate}
                    onChangeSet={({ start, end }) => updateParam({ startDate: start, endDate: end })}
                />
            </div>


            {upcomingMovies.content.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {upcomingMovies.content.map((movie) =>
                            <div key={movie.id} className="bg-neutral-0 border border-neutral-200 rounded-2xl shadow-card flex justify-center p-2">

                                <Card
                                    title={movie.title}
                                    imageUrl={getMovieImage(movie)}
                                    details={[`${movie.durationInMinutes} MIN`, "|", movie.genres?.[0]?.name]}
                                    startDateLabel={movie.projectionStartDate}
                                />
                            </div>
                        )}
                    </div>

                    {upcomingMovies.hasNext && upcomingMovies.content.length > 0 && (
                        <button
                            onClick={handleLoadMore}
                            className="flex justify-center text-urbanist text-dark-red 
                                        text-semibold text-sm sm:text-base md:text-lg lg:text-lg underline">
                            Load more
                        </button>
                    )}
                </>
            ) : (
                <NoDataFound
                    icon={faFilm}
                    title={"No movies to preview for current range"}
                    text={"We are working on updating our schedule for upcoming movies. Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!"}
                    actionText={"Explore Upcoming Movies"}
                />
            )}
        </div>
    );
}

export default UpcomingMovies;