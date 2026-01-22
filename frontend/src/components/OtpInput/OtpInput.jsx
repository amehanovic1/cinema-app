import { RE_DIGIT } from "../../utils/regexPatterns";

const OtpInput = ({ value, valueLength, onChange }) => {
    const valueItems = new Array(valueLength).fill("")

    const focusToNextInput = (target) => {
        const nextElementSibling = target.nextElementSibling;

        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    }

    const focusToPreviousInput = (target) => {
        const previousElementSibling = target.previousElementSibling;

        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    }

    /**
     * Handles input change for a single OTP cell.
     *
     * Supports:
     * - typing a single digit
     * - pasting the entire OTP at once
     */
    const inputOnChange = (e, idx) => {
        const input = e.target;
        const inputValue = input.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(inputValue);

        if (!isTargetValueDigit && inputValue) {
            return;
        }

        if (inputValue.length === valueLength) {
            onChange(inputValue);
            input.blur();
            return;
        }

        const newValue = value.substring(0, idx) + (inputValue || " ") + value.substring(idx + 1);
        onChange(newValue);

        if (inputValue) {
            focusToNextInput(input);
        }
    }

    /**
    * Handles keyboard navigation between OTP inputs.
    */
    const inputOnKeyDown = (e) => {
        const { key, target } = e;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPreviousInput(target);
        }

        if (e.key !== 'Backspace' && target === '') {
            focusToPreviousInput(target);
        }
    }

    const inputOnFocus = (e) => {
        e.target.setSelectionRange(0, e.target.value.length);
    }

    return (
        <div className="flex justify-center gap-2 mt-4 max-w-xs mx-auto" data-testid="otp-input-container">
            {valueItems.map((_, idx) => (
                <input
                    key={idx}
                    data-testid={`otp-input-field-${idx}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength={valueLength}
                    className="w-12 h-14 border border-neutral-200 bg-neutral-25/10 rounded-2xl h-12 text-center font-bold text-4xl text-neutral-25"
                    value={value[idx] || ""}
                    onChange={(e) => inputOnChange(e, idx)}
                    onKeyDown={inputOnKeyDown}
                    onFocus={inputOnFocus}
                />

            ))}
        </div>
    );
}

export default OtpInput;