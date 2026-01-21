import InputField from "../../components/InputField/InputField";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../../services/authService";
import { useState } from "react";
import { validateConfirmPassword, validateEmail, validatePassword } from "../../utils/validatorUtils";

const SignUpForm = ({ setView, setEmail }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [serverError, setServerError] = useState("")
    const [hasServerError, setHasServerError] = useState(false)
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password, { confirm: formData.confirmPassword });
        const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

        if (emailError) validationErrors.email = emailError
        if (passwordError) validationErrors.password = passwordError
        if (confirmPasswordError) validationErrors.confirmPassword = confirmPasswordError

        setErrors(validationErrors);
        setServerError("");
        setHasServerError(false);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await registerUser(
                    {
                        email: formData.email,
                        password: formData.password
                    });

                if (!res.success && res.isVerified) {
                    setServerError(res.message);
                    setHasServerError(true);
                }
                else {
                    setView("verify");
                    setEmail(formData.email);
                    setHasServerError(false);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <form onSubmit={handleSubmit} noValidate data-testid="sign-up-form">
            <div className="flex flex-col gap-1">

                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email Adress"
                    icon={faEnvelope}
                    onChange={handleChange}
                    value={formData.email}
                    error={errors.email || hasServerError}
                />

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    icon={faLock}
                    onChange={handleChange}
                    value={formData.password}
                    error={errors.password || hasServerError}
                    hiddenInput={true}
                />

                <InputField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Retype Password"
                    icon={faLock}
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    error={errors.confirmPassword || hasServerError}
                    hiddenInput={true}
                />

                <span
                    data-testid="signup-server-error"
                    className="text-left block h-4 mb-1 text-error-300 text-sm text-normal"
                >
                    {serverError || ""}
                </span>

                <button
                    type="submit"
                    data-testid="sign-up-submit-button"
                    className="py-2 text-base font-semibold w-full rounded-lg bg-dark-red text-neutral-25">
                    Sign Up
                </button>

                <p className="text-center text-base font-normal text-neutral-25">
                    Already have an account? <span
                        data-testid="switch-to-signin-link"
                        className="cursor-pointer underline"
                        onClick={() => setView("signIn")}
                    > Sign In
                    </span>
                </p>

            </div>
        </form>
    )
}

export default SignUpForm;