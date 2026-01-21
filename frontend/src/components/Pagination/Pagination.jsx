import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

const Pagination = ({ number, totalElements, size, hasNext, hasPrevious, onPageChange }) => {

    const end = Math.min((number + 1) * size, totalElements)

    return (
        <div
            className="w-full flex flex-col sm:flex-row justify-end items-center gap-1 sm:gap-2 md:gap-4 lg:gap-5"
            data-testid="pagination-main-nav"
        >
            <p className="font-regular text-neutral-800 text-xs sm:text-sm md:text-base lg:text-lg"
                data-testid="pagination-summary-text"
            > Showing
                <span
                    className="font-semibold" data-testid="pagination-count-current"> {end}
                </span> out of
                <span
                    className="font-semibold" data-testid="pagination-count-total"> {totalElements}
                </span>
            </p>

            <div className="flex gap-1 sm:gap-2 md:gap-3 lg:ga-4">
                <button
                    onClick={() => onPageChange(number - 1)}
                    disabled={!hasPrevious}
                    data-testid="pagination-btn-prev"
                    className="inline-flex items-center justify-center bg-neutral-0 disabled:opacity-50 border border-neutral-200 rounded-lg p-1 sm:p-1.5 md:p-2 lg:p-3 group">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-neutral-800 group-disabled:text-neutral-200"
                    />
                </button>

                <button
                    onClick={() => onPageChange(number + 1)}
                    disabled={!hasNext}
                    data-testid="pagination-btn-next"
                    className="inline-flex items-center justify-center bg-neutral-0 disabled:opacity-50 border border-neutral-200 rounded-lg p-1 sm:p-1.5 md:p-2 lg:p-3 group">
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-neutral-800 group-disabled:text-neutral-200"
                    />
                </button>
            </div>
        </div>
    );
}

export default Pagination;