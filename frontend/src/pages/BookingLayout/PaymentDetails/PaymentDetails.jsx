import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../stripe";
import { createPaymentIntent } from "../../../services/paymentService";
import { format } from "date-fns";
import { formatTime } from "../../../utils/dateTimeFormatter";
import PaymentForm from "../PaymentForm/PaymentForm";

const SummaryRow = ({ label, value }) => (
    <div>
        <h3 className="text-neutral-400 text-sm md:text-base font-regular">
            {label}
        </h3>
        <p className="text-neutral-25 font-semibold text-sm md:text-base whitespace-pre-line">
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
        <div className="flex w-full h-full justify-center items-center p-20 text-dark-red font-bold">
            Loading payment details...
        </div>
    );

    return (
        <>
            <div className="m-4 md:m-8 flex gap-8 justify-start">
                <div className="flex flex-col flex-1">
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

                <div className="flex flex-col flex-1 max-w-md">
                    <h1 className="text-neutral-500 font-bold text-lg md:text-xl">
                        Booking Summary
                    </h1>
                    <div className="flex flex-col gap-4 bg-neutral-800 rounded-2xl shadow-lg overflow-hidden p-4">

                        <div className="flex gap-2">
                            <img
                                src={posterUrl}
                                alt={title}
                                className="w-32 h-32 object-cover aspect-square rounded-lg shadow-md"
                            />

                            <div className="flex flex-col gap-2 text-neutral-25">
                                <h1 className="font-bold text-lg md:text-xl">
                                    {title}
                                </h1>
                                <div className="flex flex-wrap gap-3 font-normal text-sm md:text-base">
                                    {pgRating}
                                    <span className="text-dark-red">|</span>
                                    {getLanguageName(language)}
                                    <span className="text-dark-red">|</span>
                                    {durationInMinutes} Min
                                </div>
                            </div>

                        </div>

                        <hr className="text-neutral-25" />

                        <SummaryRow
                            label="Date and Time"
                            value={`${format(new Date(projectionDate), 'EEEE, MMM d')} at ${formatTime(projectionTime)}`}
                        />

                        <SummaryRow
                            label="Cinema Details"
                            value={`${venueName} : ${street} ${streetNumber},  ${city.name} \n ${hallName}`}
                        />

                        <SummaryRow
                            label="Seat(s)"
                            value={formattedSeats}
                        />

                        <SummaryRow
                            label="Price Details"
                            value={totalPrice.toFixed(2)}
                        />

                    </div>
                </div>

            </div>

        </>
    );
};

export default PaymentDetails;