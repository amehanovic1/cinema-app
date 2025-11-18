import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

const Pagination = ({ number, totalElements, size, hasNext, hasPrevious, onPageChange }) => {

    const end = Math.min((number + 1) * size, totalElements)

    return (
        <div className="w-full flex flex-col sm:flex-row justify-end items-center gap-1 sm:gap-2 md:gap-4 lg:gap-5">
            <p className="font-regular text-neutral-800 text-xs sm:text-sm md:text-base lg:text-lg">Showing
                <span
                    className="font-semibold"> {end}
                </span> out of
                <span
                    className="font-semibold"> {totalElements}
                </span>
            </p>

            <div className="flex gap-1 sm:gap-2 md:gap-3 lg:ga-4">
                <button
                    onClick={() => onPageChange(number - 1)}
                    disabled={!hasPrevious}
                    className="inline-flex items-center justify-center bg-neutral-0 disabled:opacity-50 border border-neutral-200 rounded-lg p-1 sm:p-1.5 md:p-2 lg:p-3 group">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-neutral-800 group-disabled:text-neutral-200"
                    />
                </button>

                <button
                    onClick={() => onPageChange(number + 1)}
                    disabled={!hasNext}
                    className="inline-flex items-center justify-center bg-neutral-0 disabled:opacity-50 border border-neutral-200 rounded-lg p-1 sm:p-1.5 md:p-2 lg:p-3 group">
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-neutral-800 group-disabled:text-neutral-200"
                    />
                </button>
            </div>
        </div>
    );
}

export default Pagination;