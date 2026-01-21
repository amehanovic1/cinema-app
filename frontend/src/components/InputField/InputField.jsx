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
    hiddenInput = false
}) => {
    const [showInput, setShowInput] = useState(false);

    return (
        <div data-testid={`input-field-wrapper-${name}`}>
            <label
                data-testid={`input-label-${name}`}
                className={`text-base font-semibold ${error ? "text-error-300" : "text-neutral-25"}`}
            >
                {label}
            </label>

            <div className={`w-full relative p-2 border rounded-lg bg-neutral-0 shadow-input
                            text-xs md:text-sm lg:text-base font-normal
                            ${error ? "border-error-300" : "border-neutral-200"}`}>

                <FontAwesomeIcon
                    icon={icon}
                    data-testid={`input-icon-${name}`}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 justify-center
                                ${value || error ? "text-error-500" : "text-neutral-400"}`}
                />

                <input
                    data-testid={`input-control-${name}`}
                    type={hiddenInput ? (showInput ? "text" : "password") : type}
                    name={name}
                    value={value}
                    placeholder={placeholder || label}
                    onChange={onChange}
                    className={`w-full pl-8 font-normal text-base 
                                outline-none focus:outline-none rounded-lg 
                                ${(value || placeholder) && error
                            ? "text-error-500 placeholder-error-500"
                            : "text-neutral-700"}`}
                />

                {hiddenInput && (
                    <FontAwesomeIcon
                        data-testid={`input-toggle-visibility-${name}`}
                        icon={showInput ? faEye : faEyeSlash}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 justify-center
                            ${error
                                ? "text-error-500"
                                : "text-neutral-400"}`}
                        onClick={() => setShowInput(prev => !prev)}
                    />
                )}

            </div>

            <span
                data-testid={`input-error-${name}`}
                className="block h-4 text-error-300 text-sm font-normal"
            >
                {error || ""}
            </span>

        </div>
    )
}

export default InputField;
