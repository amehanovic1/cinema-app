import { useEffect, useState } from 'react';
import { getCurrentlyShowingMovies, getUpcomingMovies } from '../../services/movieService';
import { getAllVenues } from '../../services/venueService';
import ContentSection from "../../components/ContentSection/ContentSection";
import Carousel from '../../components/Carousel/Carousel';
import VenueButtonList from './VenueButtonList/VenueButtonList';
import Card from '../../components/Card/Card';
import { ROUTES } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';
import { CarouselSkeleton } from '../../components/Carousel/CarouselSkeleton';
import { VenueButtonListSkeleton } from './VenueButtonList/VenueButtonListSkeleton';
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { CardSkeleton } from '../../components/Card/CardSkeleton';
import NoDataFound from '../../components/NoDataFound/NoDataFound';
import { formatForId } from '../../utils/testUtils';

const Home = () => {
    const navigate = useNavigate()

    const [currentMovies, setCurrentMovies] = useState({})
    const [upcomingMovies, setUpcomingMovies] = useState({})
    const [venues, setVenues] = useState({})
    const [carouselMovies, setCarouselMovies] = useState([])

    const [isLoadingCurrentMovies, setIsLoadingCurrentMovies] = useState(true)
    const [isLoadingUpcomingMovies, setIsLoadingUpcomingMovies] = useState(true)
    const [isLoadingVenues, setIsLoadingVenues] = useState(true)

    const createPlaceholderItems = (count = 4) => ({
        content: [...Array(count)].map((_, i) => ({ id: i })),
        size: count,
        number: 0,
        totalElements: count,
        hasNext: false,
        hasPrevious: false
    });

    useEffect(() => {
        fetchCurrentlyShowing();
        fetchUpcoming();
        fetchVenues();
    }, []);

    const fetchCurrentlyShowing = async (page = 0, size = 4) => {
        try {
            setIsLoadingCurrentMovies(true);
            const res = await getCurrentlyShowingMovies({ page, size });

            setCurrentMovies(res);

            if (page === 0) setCarouselMovies(res.content.slice(0, 3))

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingCurrentMovies(false);
        }
    }

    const fetchUpcoming = async (page = 0, size = 4) => {
        try {
            setIsLoadingUpcomingMovies(true)
            const res = await getUpcomingMovies({ page, size });
            setUpcomingMovies(res);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingUpcomingMovies(false);
        }
    }

    const fetchVenues = async (page = 0, size = 4) => {
        try {
            setIsLoadingVenues(true)
            const res = await getAllVenues({ page, size });
            setVenues(res);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingVenues(false);
        }
    }

    const getMovieImage = (movie, type = "poster") => {
        return movie.images?.find(img => img.type === type)?.url || "";
    }

    const renderCarouselItem = (movie) => {
        const movieId = formatForId(movie.title);

        return (
            <div
                className='absolute flex flex-col justify-start top-1/2 left-4 sm:left-6 md:left-8 lg:left-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-neutral-25 -translate-y-1/2 gap-3'
                data-testid={`carousel-item-${movieId}`}
            >

                <div className='flex gap-2'>
                    {movie.genres?.[0] && (
                        <button
                            disabled
                            className='bg-neutral-0 text-neutral-800 text-xs md:text-sm lg:text-base rounded px-2 py-1 lg:px-3 lg:-2'
                            data-testid={`carousel-genre-${movieId}`}
                        >
                            {movie.genres[0].name}
                        </button>
                    )}
                </div>

                <h1
                    className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'
                    data-testid={`carousel-title-${movieId}`}
                >
                    {movie?.title}
                </h1>

                <p
                    className='font-bold text-sm sm:text-base md:text-lg lg:text-xl mt-1 sm:mt-2 md:mt-3'
                    data-testid={`carousel-synopsis-${movieId}`}
                >
                    {movie?.synopsis?.split('.')[0] + '.'}
                </p>
            </div>
        );
    }

    return (
        <div data-testid="home-page">
            <div className='w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]' data-testid="home-carousel">
                {isLoadingCurrentMovies
                    ? <CarouselSkeleton />
                    : carouselMovies?.length > 0
                        ? <Carousel
                            items={carouselMovies}
                            getImage={(movie) => getMovieImage(movie, "backdrop")}
                            renderItem={renderCarouselItem}
                            autoSlide={true}
                            autoSlideInterval={4000}
                        />
                        : <NoDataFound
                            icon={faFilm}
                            title={"No movies to preview"}
                            text={"We are working on updating our schedule for currently showing movies. Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!"}
                        />
                }
            </div>

            {isLoadingVenues
                ? <VenueButtonListSkeleton />
                : <VenueButtonList />
            }

            <div className='bg-neutral-25 flex flex-col gap-6 p-4 sm:p-6 md:p-8 lg:p-12' data-testid="movies-content-wrapper">

                <div data-testid="section-currently-showing">
                    <ContentSection
                        title="Currently Showing"
                        linkTo={ROUTES.CURRENTLY_SHOWING}
                        items={isLoadingCurrentMovies ? createPlaceholderItems(4) : currentMovies}
                        getAll={fetchCurrentlyShowing}
                        renderItem={(movie) =>
                            isLoadingCurrentMovies
                                ? <CardSkeleton />
                                : <Card
                                    title={movie.title}
                                    imageUrl={getMovieImage(movie)}
                                    details={[`${movie.durationInMinutes} MIN |`, movie.genres?.[0]?.name]}
                                    onClick={() => navigate(ROUTES.MOVIE_DETAILS.replace(':movieId', movie.id))}
                                />
                        }
                    />

                    {!isLoadingCurrentMovies && (!currentMovies?.content || currentMovies.content.length === 0) &&
                        <NoDataFound
                            icon={faFilm}
                            title={"No movies to preview"}
                            text={"We are working on updating our schedule for currently showing movies. Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!"}
                        />
                    }
                </div>

                <div data-testid="section-upcoming">
                    <ContentSection
                        title="Upcoming Movies"
                        linkTo={ROUTES.UPCOMING_MOVIES}
                        items={isLoadingUpcomingMovies ? createPlaceholderItems(4) : upcomingMovies}
                        getAll={fetchUpcoming}
                        renderItem={(movie) =>
                            isLoadingUpcomingMovies
                                ? <CardSkeleton />
                                : <Card
                                    title={movie.title}
                                    imageUrl={getMovieImage(movie)}
                                    details={[`${movie.durationInMinutes} MIN`, "|", movie.genres?.[0]?.name]}
                                    onClick={() => navigate(ROUTES.MOVIE_DETAILS.replace(':movieId', movie.id))}
                                />
                        }
                    />

                    {!isLoadingUpcomingMovies && (!upcomingMovies?.content || upcomingMovies.content.length === 0) &&
                        <NoDataFound
                            icon={faFilm}
                            title={"No movies to preview"}
                            text={"We are working on updating our schedule for upcoming movies. Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!"}
                        />
                    }
                </div>

                <div data-testid="section-venues">
                    <ContentSection
                        title="Venues"
                        items={isLoadingVenues ? createPlaceholderItems(4) : venues}
                        getAll={fetchVenues}
                        renderItem={(venue) =>
                            isLoadingVenues
                                ? <CardSkeleton />
                                : <Card
                                    title={venue.name}
                                    imageUrl={venue.imageUrl}
                                    details={[`${venue.street},`, venue.city.name]}
                                />
                        }
                    />

                    {!isLoadingVenues && (!venues?.content || venues.content.length === 0) &&
                        <NoDataFound
                            icon={faFilm}
                            title={"No venues to preview"}
                            text={"We are working on updating venues. Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!"}
                        />
                    }
                </div>

            </div>
        </div>
    );
}

export default Home;