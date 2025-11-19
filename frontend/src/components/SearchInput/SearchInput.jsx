import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const SearcInput = ({ text, onChange }) => {

    const [searchTitle, setSearchTitle] = useState("")

    const handleInputChange = (e) => {
        const search = e.target.value
        setSearchTitle(search)
        if (onChange) onChange(search);
    }

    return (
        <div className="w-full relative p-2 border rounded focus:outline-none focus:ring-2 focus:ring-dark-red bg-neutral-0 shadow-input
                        text-neutral-400 text-xs md:text-sm lg:text-base font-normal ">
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 -translate-y-1/2 justify-center "
            />

            <input
                type="text"
                value={searchTitle}
                onChange={handleInputChange}
                placeholder={text}
                className="w-full pl-8 text-neutral-500"
            />
        </div>
    );
}

export default SearcInput;