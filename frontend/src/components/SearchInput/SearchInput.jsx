import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchInput = ({ text, selectedValue, onChange }) => {

    const searchTitle = selectedValue

    const handleInputChange = (e) => {
        const search = e.target.value
        if (onChange) onChange(search);
    }

    return (
        <div className="w-full relative p-2 border rounded bg-neutral-0 shadow-input
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
                className="w-full pl-8 text-neutral-500 outline-none focus:outline-none"
            />
        </div>
    );
}

export default SearchInput;