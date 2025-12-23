import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const InputField = ({
    label,
    type,
    name,
    placeholder,
    icon,
    onChange,
    value,
    error,
    hasServerError,
    hiddenInput = false
}) => {
    const [inputType, setInputType] = useState(type);

    const toggleInputType = () => {
        setInputType(prev => prev === "password" ? "text" : "password")
    }

    return (
        <div>
            <label className={`text-base font-semibold 
                ${error || hasServerError ? "text-error-300" : "text-neutral-25"}`}>
                {label}
            </label>

            <div className={`w-full relative p-2 border rounded-lg bg-neutral-0 shadow-input
                            text-xs md:text-sm lg:text-base font-normal
                            ${error || hasServerError ? "border-error-300" : "border-neutral-200"}`}>

                <FontAwesomeIcon
                    icon={icon}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 justify-center
                                ${value || error || hasServerError ? "text-error-500" : "text-neutral-400"}`}
                />

                <input
                    type={inputType}
                    name={name}
                    value={value}
                    placeholder={placeholder || label}
                    onChange={onChange}
                    className={`w-full pl-8 font-normal text-base 
                                outline-none focus:outline-none rounded-lg 
                                ${(value || placeholder) && (error || hasServerError)
                            ? "text-error-500 placeholder-error-500"
                            : "text-neutral-700"}`}
                />

                {hiddenInput && (
                    <FontAwesomeIcon
                        icon={inputType === "password" ? faEyeSlash : faEye}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 justify-center
                            ${error || hasServerError
                                ? "text-error-500"
                                : "text-neutral-400"}`}
                        onClick={toggleInputType}
                    />
                )}

            </div>

            <span className="block h-4 text-error-300 text-sm font-normal">{error || ""}</span>

        </div>
    )
}

export default InputField;
