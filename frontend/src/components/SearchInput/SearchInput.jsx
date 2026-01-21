import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchInput = ({ text, selectedValue, onChange }) => {

    const searchTitle = selectedValue

    const handleInputChange = (e) => {
        const search = e.target.value
        if (onChange) onChange(search);
    }

    return (
        <div
            data-testid="search-input-wrapper"
            className={`w-full relative p-2 border rounded bg-neutral-0 shadow-input
                        text-xs md:text-sm lg:text-base font-normal
                        ${selectedValue ? "border-dark-red" : "border-neutral-400"}`}>

            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                data-testid="search-input-icon"
                className={`absolute left-3 top-1/2 -translate-y-1/2 justify-center
                            ${selectedValue ? "text-dark-red" : "text-neutral-400"}`}
            />

            <input
                type="text"
                data-testid="search-input-field"
                value={searchTitle}
                onChange={handleInputChange}
                placeholder={text}
                className="w-full pl-8 text-neutral-500 outline-none focus:outline-none"
            />
        </div>
    );
}

export default SearchInput;
