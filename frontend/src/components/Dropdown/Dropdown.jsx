import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ items, selectText, icon, onChange }) => {

    const [selectedItem, setSelectedItem] = useState("")
    const [isSelectorOpen, setIsSelectorOpen] = useState(false)
    const allOption = { id: "all", name: selectText }
    const allItems = [allOption, ...items]

    const handleChange = (item) => {
        setSelectedItem(item.name);
        setIsSelectorOpen(false);
        onChange(item.id === "all" ? "" : item.name);
    }

    return (
        <div className="w-full font-base relative overflow-visible bg-neutral-0 shadow-input">
            
            <div
                className="w-full p-2 flex items-center justify-between border rounded cursors-pinter"
                onClick={() => setIsSelectorOpen(!isSelectorOpen)}>

                <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                        icon={icon}
                        className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-neutral-400"
                    />

                    <span className="justify-start text-xs md:text-sm lg:text-base font-normal text-neutral-500">
                        {selectedItem ? selectedItem : selectText}
                    </span>
                </div>

                <FontAwesomeIcon
                    icon={faAngleDown}
                    className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-neutral-400 transition 
                        ${isSelectorOpen ? "rotate-180" : ""}`}
                />
            </div>

            <ul
                className={`absolute left-0 rigth-0 z-50 mt-0 w-full bg-neutral-0 mt-2 overflow-y-auto transition-all duration-300 roundedn  
                    ${isSelectorOpen ? "max-h-60 opacity-100" : "max-h-0"}`}>
                {allItems?.map(item => (
                    <li
                        key={item.id}
                        className={`py-2 px-3 text-xs md:text-sm lg:text-base hover:bg-neutral-800 hover:text-white 
                            ${item === selectedItem ? "bg-neutral-400 text-white" : ""}`}
                        onClick={() => { handleChange(item) }}>
                        {item.name}
                    </li>
                ))}
            </ul>


        </div>
    )
}

export default Dropdown;