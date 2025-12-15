import { useMemo } from "react";
import { RE_DIGIT } from "../../utils/regexPatterns";

const OtpInput = ({ value, valueLength, onChange }) => {

    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items = [];
        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];
            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push("");
            }
        }

        return items;

    }, [value, valueLength]);


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

    const inputOnChange = (e, idx) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {

            const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);

            onChange(newValue);

            if (!isTargetValueDigit) {
                return;
            }

            focusToNextInput(target);

        } else if (targetValueLength === valueLength) {
            onChange(targetValue);
            target.blur();
        }
    }

    const inputOnKeyDown = (e) => {
        const { key } = e;
        const target = e.target;
        const targetValue = target.value;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPreviousInput(target);
        }

        target.setSelectionRange(0, targetValue.length);

        if (e.key !== 'Backspace' || targetValue !== '') {
            return;
        }

        focusToPreviousInput(target);
    }

    const inputOnFocus = (e) => {
        const { target } = e;

        target.setSelectionRange(0, target.value.length);
    }

    return (
        <div className="flex justify-center gap-2 mt-4 max-w-xs mx-auto">
            {
                valueItems.map((digit, idx) => (
                    <input
                        key={idx}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="\d{1}"
                        maxLength={valueLength}
                        className="w-12 h-14 border border-neutral-200 bg-neutral-25/10 rounded-2xl h-12 text-center font-bold text-4xl text-neutral-25"
                        value={digit}
                        onChange={(e) => inputOnChange(e, idx)}
                        onKeyDown={inputOnKeyDown}
                        onFocus={inputOnFocus}
                    />

                ))
            }
        </div>
    );
}

export default OtpInput;