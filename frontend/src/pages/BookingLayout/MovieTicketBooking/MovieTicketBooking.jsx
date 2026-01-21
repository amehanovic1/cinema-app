import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { formatTime } from "../../../utils/dateTimeFormatter";
import CinemaHallSeatBooking from "../CinemaHallSeatBooking/CinemaHallSeatBooking";
import { getSeatTypes } from "../../../services/seatTypeService";
import { getCinemaHallSeats, getReservedSeatsForProjection } from "../../../services/hallSeatService";
import { reserve } from "../../../services/bookingService";
import Modal from "../../../components/Modal/Modal";
import { ROUTES } from "../../../routes/routes";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const MovieTicketBooking = ({ projectionDetails, bookingData, mode, onContinue }) => {
    const navigate = useNavigate();

    const bookingId = bookingData?.id;
    const { id: projectionId, cinemaHall } = projectionDetails || {};
    const { id: cinemaHallId, name: hallName, venue } = cinemaHall || {};
    const { city, name: venueName, street, streetNumber } = venue || {};

    const [hallSeats, setHallSeats] = useState([])
    const [seatTypes, setSeatTypes] = useState([])
    const [reservedSeats, setReservedSeats] = useState([])

    const [isReservationSuccessful, setIsReservationSuccessful] = useState(false);

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
            const res = await getCinemaHallSeats(cinemaHallId);
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
        fetchSeatTypes();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            if (!projectionId || !cinemaHallId) return;

            await Promise.all([
                fetchCinemaHallSeats(),
                fetchReservedSeatsForProjection()
            ]);
        };

        loadData();
    }, [projectionId, cinemaHallId]);


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

    const handleFinalAction = async () => {
        try {
            if (mode === "payment")
                return onContinue();

            const res = await reserve(bookingId);
            if (res.success)
                setIsReservationSuccessful(true);

        } catch (error) {
            console.error(error);
        }
    };

    const getLanguageName = (languageCode) =>
        new Intl.DisplayNames(['en'], { type: 'language' }).of(languageCode);

    return (
        <>
            {projectionDetails && (
                <div data-testid="movie-ticket-booking-selection-wrapper">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6 m-4 md:m-8">

                        <div className="justify-start md:col-span-2 flex aspect-square overflow-hidden rounded-xl">
                            <img
                                src={projectionDetails.posterUrl}
                                alt={projectionDetails.title}
                                className="w-full h-full object-cover rounded-xl"
                                data-testid="booking-movie-poster"
                            />
                        </div>

                        <div className="md:col-span-3 flex flex-col justify-between text-neutral-800">
                            <div>
                                <h1 className="font-bold text-lg md:text-xl mb-1" data-testid="booking-movie-title">
                                    {projectionDetails.title}
                                </h1>

                                <div className="flex flex-wrap gap-3 font-normal text-sm md:text-base" data-testid="booking-movie-info-row">
                                    <span data-testid="booking-movie-rating">
                                        {projectionDetails.pgRating}
                                    </span>

                                    <span className="text-dark-red">|</span>

                                    <span data-testid="booking-movie-language">
                                        {getLanguageName(projectionDetails.language)}
                                    </span>

                                    <span className="text-dark-red">|</span>

                                    <span data-testid="booking-movie-duration">
                                        {projectionDetails.durationInMinutes} Min
                                    </span>
                                </div>

                            </div>
                        </div>

                        <div className="md:col-span-7 flex flex-col">
                            <h1 className="text-neutral-800 font-bold text-lg md:text-xl">Booking Details</h1>
                            <div className="flex flex-col gap-2 flex-wrap mt-2" data-testid="booking-projection-summary">
                                <p data-testid="booking-projection-date-time">
                                    {format(projectionDetails.projectionDate, 'EEEE, MMM d')} at {formatTime(projectionDetails.projectionTime)}
                                </p>
                                <p data-testid="booking-projection-venue">
                                    {venueName} : {street} {streetNumber},  {city.name}
                                </p>
                                <p className="mb-2" data-testid="booking-projection-hall">{hallName}</p>
                            </div>
                        </div>

                    </div>

                    <div className="w-full h-1 bg-neutral-200" />

                    <CinemaHallSeatBooking
                        bookingData={bookingData}
                        projectionDetails={projectionDetails}
                        seatTypes={seatTypes}
                        hallSeats={hallSeats}
                        reservedSeats={reservedSeats}
                        handleClick={handleFinalAction}
                        mode={mode}
                    />

                    {isReservationSuccessful &&
                        <Modal>
                            <Modal.Header description={"Seats Reserved!"} />
                            <Modal.Body>
                                <p data-testid="reservation-success-message">
                                    Your reservation confirmation has been sent to your email.
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    data-testid="reservation-back-home-button"
                                    className="px-2 py-1 border rounded-md border-dark-red text-dark-red font-bold text-xs md:text-sm"
                                    onClick={() => navigate(ROUTES.HOME)}>
                                    Back To Home
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