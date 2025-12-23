export const RE_DIGIT = new RegExp(/^\d+$/);

export const RE_PASSWORD = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/);

export const RE_EMAIL = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);