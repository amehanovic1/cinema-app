import { useContext, useEffect, useState } from "react";
import { getMovieProjectionDetails } from "../../services/movieProjectionService";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { formatTime } from "../../utils/dateTimeFormatter";
import CinemaHallSeatBooking from "../../components/CinemaHallSeatBooking/CinemaHallSeatBooking";
import { getSeatTypes } from "../../services/seatTypeService";
import { getCinemaHallSeats, getReservedSeatsForProjection } from "../../services/hallSeatService";
import AuthContext from "../../context/AuthContext";
import { reserve } from "../../services/bookingService";
import PopUp from "../../components/PopUp/PopUp";
import { ROUTES } from "../../routes/routes";
import MovieTicketBookingSkeleton from "./MovieTicketBookingSkeleton";

const MovieTicketBooking = () => {
    const { projectionId } = useParams()
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [projectionDetails, setProjectionDetails] = useState(null)
    const [hallSeats, setHallSeats] = useState([])
    const [seatTypes, setSeatTypes] = useState([])
    const [reservedSeats, setReservedSeats] = useState([])

    const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const cinemaHall = projectionDetails?.cinemaHall;
    const venue = cinemaHall?.venue;
    const city = venue?.city

    const fetchDetails = async () => {
        try {
            setIsLoading(true);
            const res = await getMovieProjectionDetails(projectionId);
            setProjectionDetails(res);
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => setIsLoading(false), 200);
        }
    }

    const fetchSeatTypes = async () => {
        try {
            const res = await getSeatTypes();
            setSeatTypes(res);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCinemaHallSeats = async () => {
        try {
            const res = await getCinemaHallSeats(cinemaHall?.id);
            setHallSeats(res);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchReservedSeatsForProjection = async () => {
        try {
            const res = await getReservedSeatsForProjection(projectionId);
            setReservedSeats(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDetails();
        fetchSeatTypes();
    }, []);

    useEffect(() => {
        if (projectionDetails) {
            fetchCinemaHallSeats();
            fetchReservedSeatsForProjection();
        }
    }, [projectionDetails]);

    const getLanguageName = (languageCode) => {
        const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
        return displayNames.of(languageCode);
    }

    const handleReservation = async (selectedSeats) => {
        const hallSeatsId = selectedSeats.map(seat => seat.id)

        try {
            await reserve({
                userId: user.id, projectionId: projectionId, hallSeatsId: hallSeatsId
            });
            setIsBookingSuccessful(true);
        } catch (error) {
            console.log(error);
        }
    }

    if(isLoading) return <MovieTicketBookingSkeleton />

    return (
        <>
            {projectionDetails && (
                <div>
                    <h1 className="m-4 md:m-8 text-neutral-800 font-bold text-2xl">
                        Seat Options
                    </h1>

                    <div className="w-full h-1 flex rounded">
                        <div className="bg-dark-red w-1/2 h-full"></div>
                        <div className="bg-neutral-200 w-1/2 h-full"></div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6 m-4 md:m-8">

                        <div className="justify-start md:col-span-2 flex aspect-square overflow-hidden rounded-xl">
                            <img
                                src={projectionDetails.posterUrl}
                                alt={projectionDetails.title}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>

                        <div className="md:col-span-3 flex flex-col justify-between text-neutral-800">
                            <div>
                                <h1 className="font-bold text-lg md:text-xl mb-1">
                                    {projectionDetails.title}
                                </h1>

                                <div className="flex flex-wrap gap-3 font-normal text-sm md:text-base">
                                    {projectionDetails.pgRating}
                                    <span className="text-dark-red">|</span>
                                    {getLanguageName(projectionDetails.language)}
                                    <span className="text-dark-red">|</span>
                                    {projectionDetails.durationInMinutes} Min
                                </div>

                            </div>
                        </div>

                        <div className="md:col-span-7 flex flex-col">
                            <h1 className="text-neutral-800 font-bold text-lg md:text-xl">Booking Details</h1>
                            <div className="flex flex-col gap-2 flex-wrap mt-2">
                                <p>{format(projectionDetails.projectionDate, 'EEEE, MMM d')} at {formatTime(projectionDetails.projectionTime)}</p>
                                <p>{venue.name} : Cinebh, {venue.street} {venue.streetNumber},  {city.name}</p>
                                <p className="mb-2">{cinemaHall.name}</p>
                            </div>
                        </div>

                    </div>

                    <div className="w-full h-1 bg-neutral-200" />

                    <CinemaHallSeatBooking
                        seatTypes={seatTypes}
                        hallSeats={hallSeats}
                        reservedSeats={reservedSeats}
                        handleClick={handleReservation}
                    />

                    <PopUp
                        showPopUp={isBookingSuccessful}
                        title="Seats Reserved!"
                        text={"Your reservation confirmation has been sent to your email."}
                        buttonText={"Back To Home"}
                        navigateTo={() => navigate(ROUTES.HOME)}
                    />

                </div>
            )}
        </>
    )
}

export default MovieTicketBooking;