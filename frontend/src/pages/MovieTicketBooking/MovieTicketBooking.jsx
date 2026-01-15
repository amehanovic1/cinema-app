import { useEffect, useState } from "react";
import { getMovieProjectionDetails } from "../../services/movieProjectionService";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { formatTime } from "../../utils/dateTimeFormatter";
import CinemaHallSeatBooking from "./CinemaHallSeatBooking/CinemaHallSeatBooking";
import { getSeatTypes } from "../../services/seatTypeService";
import { getCinemaHallSeats, getReservedSeatsForProjection } from "../../services/hallSeatService";
import { reserve, createBookingSession } from "../../services/bookingService";
import Modal from "../../components/Modal/Modal";
import { ROUTES } from "../../routes/routes";
import MovieTicketBookingSkeleton from "./MovieTicketBookingSkeleton";
import useTimer from "../../hooks/useTimer";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const MovieTicketBooking = () => {
    const { projectionId } = useParams()
    const navigate = useNavigate();

    const [projectionDetails, setProjectionDetails] = useState(null)
    const [hallSeats, setHallSeats] = useState([])
    const [seatTypes, setSeatTypes] = useState([])
    const [reservedSeats, setReservedSeats] = useState([])
    const [bookingId, setBookingId] = useState(null);

    const [isLoading, setIsLoading] = useState(true)
    const [isReservationSuccessful, setIsReservationSuccessful] = useState(false);
    const [isSessionExpired, setIsSessionExpired] = useState(false);
    const [showSessionInfo, setShowSessionInfo] = useState(false);

    const { minutes, seconds, reset } = useTimer({
        initialMinutes: 5,
        initialSeconds: 0
    });

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

    const startBookingSession = async () => {
        try {
            const sessionData = await createBookingSession();
            setBookingId(sessionData.bookingId);
        } catch (error) {
            console.log(error);
        }
    };

    const resetBookingSession = async () => {
        setIsSessionExpired(false);
        setIsLoading(true);

        try {
            await startBookingSession();
            await fetchReservedSeatsForProjection();
            reset();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
        fetchSeatTypes();
        startBookingSession();
    }, []);

    useEffect(() => {
        if (projectionDetails) {
            fetchCinemaHallSeats();
            fetchReservedSeatsForProjection();
        }
    }, [projectionDetails]);

    useEffect(() => {
        if (minutes === 0 && seconds === 0 && !isLoading && bookingId) {
            setIsSessionExpired(true);
        }
    }, [minutes, seconds, isLoading, bookingId]);

    useEffect(() => {
        const socket = process.env.REACT_APP_WS_URL;

        const stompClient = new Client({
            webSocketFactory: () => new SockJS(socket),
            reconnectDelay: 5000,
            onConnect: () => {
                stompClient.subscribe(`/topic/projection/${projectionId}`, (message) => {
                    if (message.body === "REFRESH_SEATS") {
                        fetchReservedSeatsForProjection();
                    }
                });

                stompClient.subscribe('/topic/global-updates', (message) => {
                    if (message.body === "REFRESH_ALL") {
                        fetchReservedSeatsForProjection();
                    }
                });
            },
            onStompError: (frame) => {
                console.error("Broker reported error: " + frame.headers["message"]);
            },
        });

        stompClient.activate();
        return () => {
            if (stompClient) stompClient.deactivate();
        };
    }, [projectionId]);

    const handleReservation = async () => {
        try {
            const res = await reserve(bookingId);
            if (res.success) setIsReservationSuccessful(true);
        } catch (error) {
            console.log(error);
        }
    }

    const getFormattedTime = () => {
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`
    }

    const getLanguageName = (languageCode) => {
        const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
        return displayNames.of(languageCode);
    }

    if (isLoading) return <MovieTicketBookingSkeleton />

    return (
        <>
            {projectionDetails && (
                <div>
                    <div className="flex justify-between m-4 md:m-8 text-neutral-800 ">
                        <h1 className="font-bold text-2xl">
                            Seat Options
                        </h1>

                        <div className="flex items-center gap-2">

                            <div
                                className="relative cursor-pointer"
                                onMouseEnter={() => setShowSessionInfo(true)}
                                onMouseLeave={() => setShowSessionInfo(false)}
                            >
                                <FontAwesomeIcon
                                    icon={faInfoCircle}
                                    className="text-neutral-400 hover:text-dark-red transition-colors"
                                />

                                {showSessionInfo && (
                                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-neutral-800 text-center font-regular text-neutral-0 text-xs rounded-lg shadow-xl z-50 animate-fade-in">
                                        <p>Session will expire in 5 minutes and selected seats will be refreshed</p>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-neutral-800"></div>
                                    </div>
                                )}
                            </div>

                            <h1 className="font-regular text-sm md:text-base text-center">
                                Session duration
                            </h1>

                            <div className="text-center font-bold px-2 py-1 bg-neutral-0 border rounded-md border-neutral-200 w-16">
                                {getFormattedTime()}
                            </div>
                        </div>
                    </div>

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
                        bookingId={bookingId}
                        projectionId={projectionId}
                        seatTypes={seatTypes}
                        hallSeats={hallSeats}
                        reservedSeats={reservedSeats}
                        handleClick={handleReservation}
                    />

                    {isReservationSuccessful &&
                        <Modal>
                            <Modal.Header description={"Seats Reserved!"} />
                            <Modal.Body>
                                <p>Your reservation confirmation has been sent to your email.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    className="px-2 py-1 border rounded-md border-dark-red text-dark-red font-bold text-xs md:text-sm"
                                    onClick={() => navigate(ROUTES.HOME)}>
                                    Back To Home
                                </button>
                            </Modal.Footer>
                        </Modal>
                    }

                    {isSessionExpired &&
                        <Modal>
                            <Modal.Header description={"Session Expired"} />
                            <Modal.Body>
                                <p>Your session expired and seats have been refreshed and updated.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    className="px-2 py-1 border rounded-md bg-dark-red text-neutral-0 font-bold text-xs md:text-sm"
                                    onClick={resetBookingSession}
                                >
                                    Okay
                                </button>
                            </Modal.Footer>
                        </Modal>
                    }
                </div>
            )}
        </>
    )
}

export default MovieTicketBooking;