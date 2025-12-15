import { verifyUser } from "../../services/authService";
import OtpInput from "../../components/OtpInput/OtpInput";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import FormButton from "../../components/FormButton/FormButton";
import { hideEmail } from "../../utils/emailUtils";

const VerificationCodeForm = ({ openDrawer }) => {
    const [otp, setOtp] = useState('')
    const [serverError, setServerError] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const { email } = useAuth();

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

            if (!res.success && !res.isVerified) {
                if (res.errorCode === "MAX_ATTEMPTS")
                    setIsDisabled(true);

                setServerError(res.message);
            } 
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

            {email && (
                <p className="mx-auto text-center font-normal text-neutral-400 text-sm w-1/2">
                    We have sent code to your email {" "}
                    <span>
                        {hideEmail(email)}
                    </span>
                    .{" "}Please, enter the code below to verify.
                </p>
            )}

            <OtpInput value={otp} valueLength={6} onChange={onChange} />

            <div className="mx-auto text-center font-normal text-neutral-400 text-sm space-y-1">
                <p>Didn't receive email?</p>

                <span className="block h-4 text-error-300 text-sm">{serverError || ""}</span>

            </div>

            <FormButton text="Continue" disabled={isDisabled} />

        </form>
    )
}

export default VerificationCodeForm;