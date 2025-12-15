import FormInput from "../../components/FormInput/FormInput";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../services/authService";
import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validatorUtils";

const SignInForm = ({ openDrawer }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [serverError, setServerError] = useState("")
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        if (emailError) validationErrors.email = emailError
        if (passwordError) validationErrors.password = passwordError

        setErrors(validationErrors);
        setServerError("");

        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await loginUser(
                    {
                        email: formData.email,
                        password: formData.password
                    });

                if (!res.success)
                    setServerError(res.message);

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

                {serverError && <span className="text-dark-red text-sm">{serverError}</span>}

                <button
                    type="submit"
                    className="mt-10 py-2 text-lg w-full bg-dark-red text-neutral-0 rounded-lg">
                    Sign Up
                </button>

                <p className="text-center text-base font-normal text-neutral-25">Don't have an account?
                    <span
                        className="cursor-pointer underline"
                        onClick={() => openDrawer("signup")}
                    >Sign In</span>
                </p>
            </div>
        </form>
    )
}

export default SignInForm;