import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../stripe";
import { createPaymentIntent } from "../../../services/paymentService";
import { format } from "date-fns";
import { formatTime } from "../../../utils/dateTimeFormatter";
import PaymentForm from "../PaymentForm/PaymentForm";
import PaymentDetailsSkeleton from "./PaymentDetailsSkeleton";

const SummaryRow = ({ label, value, testId }) => (
    <div data-testid={testId}>
        <h3 className="text-neutral-400 text-sm md:text-base font-regular" data-testid="label">
            {label}
        </h3>
        <p
            className="text-neutral-25 font-semibold text-sm md:text-base whitespace-pre-line"
            data-testid="value"
        >
            {value}
        </p>
    </div>
);

const PaymentDetails = ({ bookingData }) => {
    const {
        id: bookingId,
        projectionDetails,
        selectedSeats = [],
        totalPrice = 0
    } = bookingData || {};

    const {
        title, posterUrl, pgRating, language, durationInMinutes,
        projectionDate, projectionTime, cinemaHall
    } = projectionDetails || {};

    const { name: hallName, venue } = cinemaHall || {};
    const { name: venueName, street, streetNumber, city } = venue || {};

    const [clientSecret, setClientSecret] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!bookingId) return;

        const loadData = async () => {
            try {
                const intentSecret = await createPaymentIntent(bookingId);
                setClientSecret(intentSecret);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [bookingId]);

    const getLanguageName = (languageCode) =>
        new Intl.DisplayNames(['en'], { type: 'language' }).of(languageCode);

    const formattedSeats = selectedSeats.map(s => s.seatCode).join(", ");

    if (isLoading || !clientSecret || !bookingData) return (
        <PaymentDetailsSkeleton />
    );

    return (
        <>
            <div className="m-4 md:m-8 flex gap-8 justify-start" data-testid="payment-details-container">
                <div className="flex flex-col flex-1" data-testid="stripe-payment-section">
                    <h1 className="text-neutral-500 font-bold text-lg md:text-xl">
                        Payment Method
                    </h1>
                    {clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <PaymentForm
                                clientSecret={clientSecret}
                                bookingData={bookingData}
                            />
                        </Elements>
                    )}
                </div>

                <div className="flex flex-col flex-1 max-w-md" data-testid="booking-summary-section">
                    <h1 className="text-neutral-500 font-bold text-lg md:text-xl">
                        Booking Summary
                    </h1>
                    <div className="flex flex-col gap-4 bg-neutral-800 rounded-2xl shadow-lg overflow-hidden p-4">

                        <div className="flex gap-2" data-testid="summary-movie-header">
                            <img
                                src={posterUrl}
                                alt={title}
                                className="w-32 h-32 object-cover aspect-square rounded-lg shadow-md"
                                data-testid="summary-movie-poster"
                            />

                            <div className="flex flex-col gap-2 text-neutral-25">
                                <h1 className="font-bold text-lg md:text-xl" data-testid="summary-movie-title">
                                    {title}
                                </h1>
                                <div className="flex flex-wrap gap-3 font-normal text-sm md:text-base" data-testid="summary-movie-specs-row">
                                    <span data-testid="summary-movie-rating">{pgRating}</span>
                                    <span className="text-dark-red">|</span>
                                    <span data-testid="summary-movie-language">{getLanguageName(language)}</span>
                                    <span className="text-dark-red">|</span>
                                    <span data-testid="summary-movie-duration">{durationInMinutes} Min</span>
                                </div>
                            </div>

                        </div>

                        <hr className="text-neutral-25" />

                        <SummaryRow
                            label="Date and Time"
                            value={`${format(new Date(projectionDate), 'EEEE, MMM d')} at ${formatTime(projectionTime)}`}
                            testId="summary-date-time"
                        />

                        <SummaryRow
                            label="Cinema Details"
                            value={`${venueName} : ${street} ${streetNumber},  ${city.name} \n ${hallName}`}
                            testId="summary-cinema-details"
                        />

                        <SummaryRow
                            label="Seat(s)"
                            value={formattedSeats}
                            testId="summary-seats"
                        />

                        <SummaryRow
                            label="Price Details"
                            value={totalPrice.toFixed(2)}
                            testId="summary-total-price"
                        />

                    </div>
                </div>

            </div>

        </>
    );
};

export default PaymentDetails;