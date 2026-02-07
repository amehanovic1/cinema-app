import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextAreaField = ({ label, name, placeholder, icon, onChange, value, maxLength = 500 }) => {

    return (
        <div className="w-full flex flex-col gap-1">
            <label className="text-neutral-700 font-semibold text-base">
                {label}
            </label>

            <div className="w-full p-2 relative border border-neutral-200 rounded-lg bg-neutral-0 text-xs md:text-sm font-normal">
                <FontAwesomeIcon
                    icon={icon}
                    className={`absolute left-3 top-3
                            ${value ? "text-error-500" : "text-neutral-400"}`}
                />

                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className="w-full pl-10 min-h-[120px] text-neutral-700 outline-none"
                />

                <div className="absolute top-2 right-3 text-neutral-500">{value?.length || 0}/{maxLength}</div>

            </div>
        </div>
    );
}

export default TextAreaField;