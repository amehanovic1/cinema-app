const FormButton = ({ text, disabled = false, onClick }) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            onClick={onClick}
            className={`py-2 text-base font-semibold w-full rounded-lg
                        ${disabled ? "bg-dark-red/50 text-neutral-25/50" : "bg-dark-red text-neutral-25"}`}>
            {text}
        </button>
    );
}

export default FormButton;