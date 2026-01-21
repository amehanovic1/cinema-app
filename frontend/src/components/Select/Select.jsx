import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Select = ({ items, selectText, icon, selectedValue, onChange }) => {

    const [isSelectorOpen, setIsSelectorOpen] = useState(false)
    const selectedItem = selectedValue === "" ? selectText : selectedValue
    const allOption = { id: "all", name: selectText }
    const allItems = [allOption, ...items]

    const formatForId = (text) => {
        return (text || "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, "");
    };

    const formattedSelectName = formatForId(selectText);

    const handleChange = (item) => {
        setIsSelectorOpen(false);
        onChange(item.id === "all" ? "" : item.name);
    }

    return (
        <div
            className="w-full font-base relative overflow-visible bg-neutral-0 shadow-input"
            data-testid={`select-wrapper-${formattedSelectName}`}
        >

            <div
                data-testid={`select-trigger-${formattedSelectName}`}
                onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                className={`w-full p-2 flex items-center justify-between border rounded cursors-ppinter
                         ${isSelectorOpen ? "border-dark-red" : "border-neutral-200 "}`}
            >

                <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                        icon={icon}
                        className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4
                            ${isSelectorOpen ? "text-dark-red" : "text-neutral-400 "}`}
                    />

                    <span
                        data-testid={`select-display-value-${formattedSelectName}`}
                        className="justify-start text-xs md:text-sm lg:text-base font-normal text-neutral-500"
                    >
                        {selectedItem}
                    </span>
                </div>

                <FontAwesomeIcon
                    icon={faAngleDown}
                    className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 transition 
                            ${isSelectorOpen ? "rotate-180 text-dark-red" : "text-neutral-400 "}`}
                />
            </div>

            <ul
                data-testid={`select-options-list-${formattedSelectName}`}
                className={`absolute left-0 right-0 z-40 mt-0 w-full bg-neutral-0 mt-2 
                        overflow-y-auto transition-all duration-300 rounded  
                        ${isSelectorOpen ? "max-h-60 opacity-100" : "max-h-0"}`}>
                {allItems?.map(item => (
                    <li
                        key={item.id}
                        data-testid={`select-option-${formattedSelectName}-${formatForId(item.name)}`}
                        className={`py-2 px-3 text-xs md:text-sm lg:text-base hover:bg-neutral-600 
                                hover:text-white 
                                ${item.name === selectedItem ? "bg-neutral-400 text-white" : ""}`}
                        onClick={() => { handleChange(item) }}>
                        {item.name}
                    </li>
                ))}
            </ul>


        </div>
    )
}

export default Select;