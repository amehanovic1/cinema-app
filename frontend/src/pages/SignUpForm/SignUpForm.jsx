import FormInput from "../../components/FormInput/FormInput";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../../services/authService";
import { useContext, useState } from "react";
import { validateConfirmPassword, validateEmail, validatePassword } from "../../utils/validatorUtils";
import AuthContext from "../../context/AuthContext";
import DrawerContext from "../../context/DrawerContext";
import SignInForm from "../SignInForm/SignInForm";
import VerificationCodeForm from "../VerificationCodeForm/VerificationCodeForm";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [serverError, setServerError] = useState("")
    const [errors, setErrors] = useState({});

    const { setEmail } = useContext(AuthContext)
    const { openDrawer } = useContext(DrawerContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

        if (emailError) validationErrors.email = emailError
        if (passwordError) validationErrors.password = passwordError
        if (confirmPasswordError) validationErrors.confirmPassword = confirmPasswordError

        setErrors(validationErrors);
        setServerError("");

        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await registerUser(
                    {
                        email: formData.email,
                        password: formData.password
                    });

                if (!res.success && res.isVerified)
                    setServerError(res.message);
                else {
                    setEmail(formData.email);
                    openDrawer("Account Activation", <VerificationCodeForm />)
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
        <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-1">

                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email Adress"
                    icon={faEnvelope}
                    onChange={handleChange}
                    value={formData.email}
                    error={errors.email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    icon={faLock}
                    onChange={handleChange}
                    value={formData.password}
                    error={errors.password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Retype Password"
                    icon={faLock}
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    error={errors.confirmPassword}
                />

                <span className="text-center block h-4 text-error-300 text-sm text-normal">
                    {serverError || ""}
                </span>

                <button
                    type="submit"
                    className="py-2 text-base font-semibold w-full rounded-lg bg-dark-red text-neutral-25">
                    Sign Up
                </button>

                <p className="text-center text-base font-normal text-neutral-25">
                    Already have an account? {" "}
                    <span
                        className="cursor-pointer underline"
                        onClick={() => openDrawer("Welcome Back", <SignInForm />)}
                    > Sign In</span>
                </p>

            </div>
        </form>
    )
}

export default SignUpForm;