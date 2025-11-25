import { useEffect, useState } from 'react';
import { getCurrentlyShowingMovies, getUpcomingMovies } from '../../services/movieService';
import { getAllVenues } from '../../services/venueService';
import ContentSection from "../../components/ContentSection/ContentSection";
import Carousel from '../../components/Carousel/Carousel';
import VenueButtonList from './VenueButtonList/VenueButtonList';
import Card from '../../components/Card/Card';
import { ROUTES } from '../../routes/routes';

const Home = () => {

    const [currentMovies, setCurrentMovies] = useState({})
    const [upcomingMovies, setUpcomingMovies] = useState({})
    const [venues, setVenues] = useState({})
    const [carouselMovies, setCarouselMovies] = useState([])

    useEffect(() => {
        fetchCurrentlyShowing();
        fetchUpcoming();
        fetchVenues();
    }, []);

    const fetchCurrentlyShowing = async (page = 0, size = 4) => {
        try {
            const res = await getCurrentlyShowingMovies({ page, size });

            setCurrentMovies(res);

            if (page === 0) setCarouselMovies(res.content.slice(0, 3))

        } catch (error) {
            console.log(error)
        }
    }

    const fetchUpcoming = async (page = 0, size = 4) => {
        try {
            const res = await getUpcomingMovies({ page, size });
            setUpcomingMovies(res);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchVenues = async (page = 0, size = 4) => {
        try {
            const res = await getAllVenues({ page, size });
            setVenues(res);
        } catch (error) {
            console.log(error)
        }
    }

    const getMovieImage = (movie, type = "poster") => {
        return movie.images?.find(img => img.type === type)?.url || "";
    }

    const renderCarouselItem = (movie) => {
        return (
            <div className='absolute flex flex-col justify-start top-1/2 left-4 sm:left-6 md:left-8 lg:left-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-neutral-25 -translate-y-1/2 gap-3'>

                <div className='flex gap-2'>
                    {movie.genres?.[0] && (
                        <button
                            disabled
                            className='bg-neutral-0 text-neutral-800 text-xs md:text-sm lg:text-base rounded px-2 py-1 lg:px-3 lg:-2'>
                            {movie.genres[0].name}
                        </button>
                    )}
                </div>

                <h1 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>{movie?.title}</h1>

                <p className='font-bold text-sm sm:text-base md:text-lg lg:text-xl mt-1 sm:mt-2 md:mt-3'>
                    {movie?.synopsis?.split('.')[0] + '.'}
                </p>
            </div>
        );
    }

    return (
        <>
            <div className='w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]'>
                <Carousel
                    items={carouselMovies}
                    getImage={(movie) => getMovieImage(movie, "backdrop")}
                    renderItem={renderCarouselItem}
                    autoSlide={true}
                    autoSlideInterval={4000}
                />
            </div>

            <div className='flex flex-col gap-6 bg-neutral-25'>
                <VenueButtonList />

                <ContentSection
                    title="Currently Showing"
                    linkTo={ROUTES.CURRENTLY_SHOWING}
                    items={currentMovies}
                    getAll={fetchCurrentlyShowing}
                    renderItem={(movie) =>
                        <Card
                            title={movie.title}
                            imageUrl={getMovieImage(movie)}
                            details={[`${movie.durationInMinutes} MIN |`, movie.genres?.[0]?.name]}
                        />
                    }
                />

                <ContentSection
                    title="Upcoming Movies"
                    items={upcomingMovies}
                    getAll={fetchUpcoming}
                    renderItem={(movie) =>
                        <Card
                            title={movie.title}
                            imageUrl={getMovieImage(movie)}
                            details={[`${movie.durationInMinutes} MIN`, "|", movie.genres?.[0]?.name]}
                        />
                    }
                />

                <ContentSection
                    title="Venues"
                    items={venues}
                    getAll={fetchVenues}
                    renderItem={(venue) =>
                        <Card
                            title={venue.name}
                            imageUrl={venue.imageUrl}
                            details={[`${venue.street},`, venue.city.name]}
                        />
                    }
                />

            </div>

        </>
    );
}

export default Home;