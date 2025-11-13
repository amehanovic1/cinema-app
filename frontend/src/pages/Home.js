import { useEffect, useState } from 'react';
import { getCurrentlyShowingMovies, getUpcomingMovies } from '../services/movieService';
import ContentSection from "../components/ContentSection";
import { getAllVenues } from '../services/venueService';
import Movie from '../components/Movie';
import Venue from '../components/Venue';
import Carousel from '../components/Carousel';
import VenueButtonList from '../components/VenueButtonList';

function Home() {
    
    const [nowShowing, setNowShowing] = useState({})
    const [upcomingMovies, setUpcomingMovies] = useState({})
    const [venues, setVenues] = useState({})

    useEffect(() => {
        fetchCurrentlyShowing();
        fetchUpcoming();
        fetchVenues();
    }, []);

    const fetchCurrentlyShowing = async (page = 0, size = 4) => {
        try {
            const res = await getCurrentlyShowingMovies(page, size);
            setNowShowing(res);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUpcoming = async (page = 0, size = 4) => {
        try {
            const res = await getUpcomingMovies(page, size);
            setUpcomingMovies(res);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchVenues = async (page = 0, size = 4) => {
        try {
            const res = await getAllVenues(page, size);
            setVenues(res);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Carousel />

            <VenueButtonList />

            <ContentSection
                title="Currently Showing"
                items={nowShowing}
                getAll={fetchCurrentlyShowing}
                renderItem={(movie) => <Movie movie={movie} />}
            />

            <ContentSection
                title="Upcoming Movies"
                items={upcomingMovies}
                getAll={fetchUpcoming}
                renderItem={(movie) => <Movie movie={movie} />}
            />

            <ContentSection
                title="Venues"
                items={venues}
                getAll={fetchVenues}
                renderItem={(venue) => <Venue venue={venue} />}
            />

        </>
    );
}

export default Home;