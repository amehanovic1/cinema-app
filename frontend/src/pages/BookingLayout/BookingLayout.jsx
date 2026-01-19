import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieProjectionDetails } from "../../services/movieProjectionService";
import { createBookingSession, getBookingDetails } from "../../services/bookingService";
import useTimer from "../../hooks/useTimer";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../components/Modal/Modal";
import PaymentDetails from "./PaymentDetails/PaymentDetails";
import MovieTicketBooking from "./MovieTicketBooking/MovieTicketBooking";
import BookingLayoutSkeleton from "./BookingLayoutSkeleton";

const BookingLayout = () => {
    const { projectionId, step, action } = useParams();
    const navigate = useNavigate();

    const { minutes, seconds, reset } = useTimer();

    const [projectionDetails, setProjectionDetails] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    const [bookingId, setBookingId] = useState(null);

    const [isLayoutLoading, setIsLayoutLoading] = useState(true);
    const [isSessionExpired, setIsSessionExpired] = useState(false);
    const [showSessionInfo, setShowSessionInfo] = useState(false);
    const isCheckout = step === "checkout";

    const startBookingSession = async () => {
        try {
            setIsLayoutLoading(true);

            const sessionStatus = await createBookingSession(projectionId);
            const currentId = sessionStatus.bookingId;
            setBookingId(currentId);

            if (currentId) {
                const sessionData = await getBookingDetails(currentId);
                setBookingData(sessionData);

                const remaining = sessionData.remainingSeconds || 0;
                reset(Math.floor(remaining / 60), remaining % 60);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLayoutLoading(false);
        }
    };

    const resetBookingSession = async () => {
        setIsSessionExpired(false);
        setIsLayoutLoading(true);

        await startBookingSession();
    };

    useEffect(() => {
        const fetchProjection = async () => {
            try {
                const details = await getMovieProjectionDetails(projectionId);
                setProjectionDetails(details);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProjection();
    }, [projectionId]);

    useEffect(() => { startBookingSession(); }, [projectionId, step]);

    useEffect(() => {
        if (!isLayoutLoading && bookingId && minutes === 0 && seconds === 0) {
            setIsSessionExpired(true);
        }
    }, [minutes, seconds, isLayoutLoading, bookingId]);

    const getFormattedTime = () => {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    if (isLayoutLoading) {
        return <BookingLayoutSkeleton />;
    }

    return (
        <div className="booking-container">
            <div className="flex justify-between m-4 md:m-8 text-neutral-800">
                <h1 className="font-bold text-2xl">
                    {isCheckout ? "Payment Details" : "Seat Options"}
                </h1>

                <div className="flex items-center gap-2">
                    <div className="relative cursor-pointer"
                        onMouseEnter={() => setShowSessionInfo(true)}
                        onMouseLeave={() => setShowSessionInfo(false)}>
                        <FontAwesomeIcon icon={faInfoCircle} className="text-neutral-400 hover:text-dark-red transition-colors" />
                        {showSessionInfo && (
                            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-neutral-800 text-center text-neutral-0 text-xs rounded-lg shadow-xl z-50">
                                <p>Session will expire in 5 minutes and selected seats will be refreshed</p>
                            </div>
                        )}
                    </div>
                    <h1 className="font-regular text-sm md:text-base text-center">Session duration</h1>
                    <div className="text-center font-bold px-2 py-1 bg-neutral-0 border rounded-md border-neutral-200 w-16">
                        {getFormattedTime()}
                    </div>
                </div>
            </div>

            <div className="w-full h-1 flex rounded bg-neutral-200 overflow-hidden">
                {isCheckout ? (
                    <div className="bg-dark-red w-full h-full transition-all duration-700 ease-in-out"></div>
                ) : (
                    <>
                        <div className="bg-dark-red w-1/2 h-full transition-all duration-500"></div>
                        <div className="bg-neutral-200 w-1/2 h-full"></div>
                    </>
                )}
            </div>


            {isCheckout ? (
                <PaymentDetails
                    bookingData={bookingData}
                />
            ) : (
                <MovieTicketBooking
                    projectionDetails={projectionDetails}
                    bookingData={bookingData}
                    mode={action}
                    onContinue={() => navigate(`/movie-ticket-booking/${projectionId}/checkout/${action}`)}
                />
            )}

            {isSessionExpired &&
                <Modal>
                    <Modal.Header description={"Session Expired"} />
                    <Modal.Body>
                        <p>Your session expired and seats have been refreshed and updated.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="px-2 py-1 border rounded-md bg-dark-red text-neutral-0 font-bold text-xs md:text-sm"
                            onClick={() => {
                                resetBookingSession();
                                navigate(`/movie-ticket-booking/${projectionId}/seats/${action}`);

                            }}
                        >
                            Okay
                        </button>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    );
};

export default BookingLayout;