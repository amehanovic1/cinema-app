import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Modal from "../../../components/Modal/Modal";
import { ROUTES } from "../../../routes/routes";

const PaymentForm = ({ clientSecret, bookingData }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const bookingId = bookingData?.id;

    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);

        const submitResult = await elements.submit();
        if (submitResult.error) {
            setIsProcessing(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            clientSecret,
            redirect: "if_required"
        });

        if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsPaymentSuccessful(true);
        } else if (error) {
            console.log(error);
        }

        setIsProcessing(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} data-testid="stripe-payment-form">
                <div data-testid="payment-element-wrapper">
                    <PaymentElement />
                </div>

                <button
                    data-testid="payment-submit-button"
                    className="w-full bg-dark-red rounded-lg text-neutral-25 mt-4 py-2 disabled:opacity-50"
                    disabled={!stripe || isProcessing}
                >
                    {isProcessing
                        ? <span data-testid="payment-processing-status">Processing...</span>
                        :
                        <>
                            Make Payment - <span data-testid="payment-amount-display">
                                {bookingData.totalPrice?.toFixed(2)}
                            </span> KM
                        </>
                    }
                </button>
            </form>

            {isPaymentSuccessful && (
                <Modal>
                    <Modal.Header description={"Payment Successful!"} />
                    <Modal.Body>
                        <p data-testid="payment-success-message">
                            The receipt and ticket have been sent to your email.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            data-testid="payment-success-home-button"
                            className="px-2 py-1 border rounded-md border-dark-red text-dark-red font-bold"
                            onClick={() => navigate(ROUTES.HOME)}>
                            Back To Home
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default PaymentForm;