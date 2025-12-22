import InputField from "../../components/InputField/InputField";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validatorUtils";
import AuthContext from "../../context/AuthContext";

const SignInForm = ({ setView, setEmail}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [serverError, setServerError] = useState("")
    const [errors, setErrors] = useState({});

    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password, {requiredOnly: true});

        if (emailError) validationErrors.email = emailError
        if (passwordError) validationErrors.password = passwordError

        setErrors(validationErrors);
        setServerError("");

        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await login({ email: formData.email, password: formData.password });
                if (!res.success) {
                    if (!res.isVerified && res.errorCode === "NOT_VERIFIED") {
                        setView("verify");
                        setEmail(formData.email);
                    }
                    
                    setServerError(res.message)
                }
                else {
                    setView("signInSuccess")
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-1">
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email Adress"
                    icon={faEnvelope}
                    onChange={handleChange}
                    value={formData.email}
                    error={errors.email}
                    hasServerError={!!serverError}
                />

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    icon={faLock}
                    onChange={handleChange}
                    value={formData.password}
                    error={errors.password}
                    hasServerError={!!serverError}
                    hiddenInput={true}
                />

                <span className="text-left block h-4 mb-1 text-error-300 text-sm text-normal">
                    {serverError || ""}
                </span>

                <button
                    type="submit"
                    className="py-2 text-base font-semibold w-full rounded-lg bg-dark-red text-neutral-25">
                    Sign In
                </button>

                <p className="text-center text-base font-normal text-neutral-25">
                    Don't have an account? <span
                        className="cursor-pointer underline"
                        onClick={() => setView("signUp")}
                    >Sign Up</span>
                </p>
            </div>
        </form>
    )
}

export default SignInForm;