import { RE_EMAIL, RE_PASSWORD } from "./regexPatterns";

export const validateEmail = (email) => {
    if (!email)
        return "Email is required.";

    if (!RE_EMAIL.test(email))
        return "Invalid email format.";

    return "";
}

export const validatePassword = (password, { requiredOnly = false } = {}) => {
    if (!password)
        return "Password is required.";

    if (requiredOnly)
        return "";

    if (password.length < 8 || password.length > 48)
        return "Password must be between 8 and 48 characters.";

    if (!RE_PASSWORD.test(password))
        return "Password must contain: A-Z, a-z, 0-9, symbol";

    return "";
}

export const validateConfirmPassword = (password, confirm) => {
    if (!confirm)
        return "Confirm password is required.";

    if (password !== confirm)
        return "Passwords do not match.";

    return "";
}
