import { useEffect, useState } from "react";
import { getCurrentlyShowingMovies } from "../../services/movieService";
import { useLocation } from "react-router-dom";
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

const MovieDetails = () => {
    const location = useLocation()
    const selectedMovie = location.state

    const [projections, setProjections] = useState({})
    const [venues, setVenues] = useState([])
    const [cities, setCities] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('sv-SE'))
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedVenue, setSelectedVenue] = useState("")
    const [currentMovies, setCurrentMovies] = useState({})

    useEffect(() => {
        fetchCurrentlyShowing();
        fetchCities();
        fetchVenues();
        fetchMovieProjections();
    }, [selectedCity, selectedDate, selectedVenue]);

    const fetchCurrentlyShowing = async (page = 0, size = 4) => {
        try {
            const res = await getCurrentlyShowingMovies({ page, size });
            setCurrentMovies(res);
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

    const fetchMovieProjections = async () => {
        try {

            const city = cities.find(c => c.name === selectedCity);
            const venue = venues.find(v => v.name === selectedVenue);

            const params = {
                movieId: selectedMovie.id,
                projectionDate: selectedDate,
                cityId: city?.id || null,
                venueId: venue?.id || null
            }

            const res = await filterMovieProjections(params);

            const unique = Array.from(
                new Map(res.map(p => [p.projectionTime, p])).values()
            );

            setProjections(previousProjections => (
                { ...previousProjections, [selectedMovie.id]: unique || [] }
            ));

        } catch (error) {
            console.log(error)
        }
    }

    const getLanguageName = (languageCode) => {
        const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
        return displayNames.of(languageCode);
    }

    const getMovieImagesByType = (type) => {
        return selectedMovie.images?.filter(img => img.type === type) || [];
    };

    const backdrops = getMovieImagesByType("backdrop").slice(0, 4)

    return (
        <div className="flex flex-col gap-2 m-4 sm:m-6 md:m-8 lg:m-12">

            <h1 className="text-neutral-800 font-bold text-2xl">
                Movie Details
            </h1>

            <div className="grid grid-cols-2 gap-4">

                <div className="col-span-1">
                    <iframe
                        className="w-full h-full aspect-video rounded-tl-xl rounded-bl-xl"
                        src="https://www.youtube.com/embed/nb_fFj_0rq8"
                        title="Trailer"
                        frameborder="0">
                    </iframe>
                </div>

                <div className="col-span-1 grid grid-rows-2 gap-2">
                    <div className="grid grid-cols-2 gap-2">
                        <img src={backdrops[0]?.url} alt="Backdrop 1" className="w-full h-auto object-cover" />
                        <img src={backdrops[0]?.url} alt="Backdrop 2" className="w-full h-auto object-cover rounded-tr-xl" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 ">
                        <img src={backdrops[0]?.url} alt="Backdrop 3" className="w-full h-auto object-cover" />
                        <img src={backdrops[0]?.url} alt="Backdrop 4" className="w-full h-auto object-cover rounded-br-xl" />
                    </div>
                </div>

                <div className="col-span-1 flex flex-col gap-2">
                    <h1 className="font-bold text-neutral-800 text-3xl">
                        {selectedMovie.title}
                    </h1>

                    <div className="flex flex-wrap gap-3">
                        <span>{selectedMovie.pgRating}</span>
                        <span className="text-dark-red">|</span>
                        <span>{getLanguageName(selectedMovie.language)}</span>
                        <span className="text-dark-red">|</span>
                        <span>{selectedMovie.durationInMinutes} Min </span>
                        <span className="text-dark-red">|</span>
                        Projection date: <span> {format(selectedMovie.projectionStartDate, "yyyy/MM/dd")} - {format(selectedMovie.projectionEndDate, "yyyy/MM/dd")} </span>
                    </div>

                    <div className="flex gap-4 mt-2 flex-wrap">
                        {selectedMovie.genres?.map(genre => (
                            <button
                                key={genre.id}
                                className="bg-neutral-200 text-sm px-2 py-1 rounded-lg" >
                                {genre.name}
                            </button>))
                        }
                    </div>

                    <p>
                        {selectedMovie.synopsis}
                    </p>

                    <h1>Director: <span>{selectedMovie.directorFullName}</span></h1>

                    <h1>
                        Writers:{" "}
                        <span className="ml-2">
                            {selectedMovie.writers
                                ?.map(w => `${w.firstName} ${w.lastName}`)
                                .join(", ")}
                        </span>
                    </h1>

                    <h1><span className="text-dark-red">| </span>Cast</h1>

                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {selectedMovie.cast?.map(c => (
                            <div key={c.id} className="rounded-lg flex flex-col items-start">
                                <div className="font-semibold">{c.firstName} {c.lastName}</div>
                                <div className="text-sm text-neutral-700">{c.characterFullName}</div>
                            </div>
                        ))}
                    </div>

                    <h1><span className="text-dark-red">| </span>Rating</h1>

                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {selectedMovie.ratings?.map(r => (
                            <div key={r.id} className="p-3 border border-neutral-400 rounded-lg flex items-center gap-2">
                                <FontAwesomeIcon icon={faStar} className="text-dark-red" />
                                <div className="flex flex-col">
                                    <div className="font-semibold">{r.value}</div>
                                    <div className="text-neutral-700">{r.source}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>


                <div className="flex flex-col gap-4 p-4 border border-dark-red rounded-xl">
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

                    <div className="flex flex-col mt-10">
                        <h1 className="text-neutral-800 font-bold text:base md:text-xl lg:text-xl">
                            Standard
                        </h1>

                        <div className="flex gap-4 flex-wrap mt-2">
                            {projections[selectedMovie.id]?.map(projection => (
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

            </div>

            <ContentSection
                title="See Also"
                items={currentMovies}
                getAll={fetchCurrentlyShowing}
                renderItem={(movie) =>
                    <Card
                        title={movie.title}
                        imageUrl={movie.images?.find(img => img.type === "poster")?.url || ""}
                    />
                }
            />

        </div>
    );
}

export default MovieDetails;