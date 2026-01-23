import { resendCode, verifyUser } from "../../services/authService";
import OtpInput from "../../components/OtpInput/OtpInput";
import { hideEmail } from "../../utils/emailUtils";
import { useState } from "react";
import useTimer from "../../hooks/useTimer";

const VerificationCodeForm = ({ setView, email }) => {
    const [otp, setOtp] = useState('')
    const [serverError, setServerError] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const [isExpired, setIsExpired] = useState(false)
    const { minutes, seconds, reset } = useTimer({ initialMinutes: 2, initialSeconds: 0 })

    const onChange = (value) => setOtp(value)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        try {
            const res = await verifyUser(
                {
                    email: email,
                    verificationCode: otp
                });

            if (res.success)
                setView("signIn");

        } catch (error) {
            if (error?.response?.data) {
                const res = error.response.data;

                if (res.errorCode === "MAX_ATTEMPTS" || res.errorCode === "CODE_EXPIRED") {
                    setIsDisabled(true);
                }

                if (res.errorCode === "CODE_EXPIRED") {
                    setIsExpired(true);
                }

                setServerError(res.message);
            } else {
                setServerError("Something went wrong. Please try again.");
            }
        }
    }

    const resendEmail = async () => {
        try {
            await resendCode({ email: email });
            setServerError("");
            setOtp("");
            reset(2, 0);
            setIsDisabled(false);
            setIsExpired(false)
        } catch (err) {
            console.log(err);
        }
    };

    const getFormattedTime = () => {
        const formattedSeconds = seconds.toString().padStart(2, '0');
        if (minutes > 0)
            return `${minutes}:${formattedSeconds}`

        return formattedSeconds;
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6" data-testid="verification-form-wrapper">

            {email && (
                <p className="mx-auto text-center font-normal text-neutral-400 text-sm w-1/2" data-testid="verification-instruction-text">
                    We have sent code to your email <span data-testid="verification-email-hidden">
                        {hideEmail(email)}
                    </span>. Please, enter the code below to verify.
                </p>
            )}

            <OtpInput value={otp} valueLength={6} onChange={onChange} />

            <div className="mx-auto text-center font-normal text-neutral-400 text-sm space-y-1">
                <p>Didn't receive email?</p>
                {(minutes === 0 && seconds === 0) || isExpired ? (
                    <button
                        type="button"
                        data-testid="verification-resend-btn"
                        onClick={resendEmail}
                        className="text-neutral-25 underline">Resend email</button>
                ) : (
                    <p data-testid="verification-timer-container">
                        You can resend email in <span className="font-semibold text-neutral-0">
                            {getFormattedTime()} </span> {minutes === 0 && " seconds"}
                    </p>
                )}

                <span
                    data-testid="verification-error-message"
                    className="text-left block h-4 mb-1 text-error-300 text-sm">
                    {serverError || ""}
                </span>

            </div>

            <button
                type="submit"
                data-testid="verification-submit-btn"
                disabled={isDisabled}
                className={`py-2 text-base font-semibold w-full rounded-lg
                        ${isDisabled ? "bg-dark-red/50 text-neutral-25/50" : "bg-dark-red text-neutral-25"}`}>
                Continue
            </button>


        </form>
    )
}

export default VerificationCodeForm;