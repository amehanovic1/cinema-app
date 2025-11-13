import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

const Pagination = ({ number, totalElements, size, hasNext, hasPrevious, onPageChange }) => {

    const end = Math.min((number + 1) * size, totalElements)

    return (
        <div className="w-full flex justify-end gap-2 items-center">
            <p className="font-regular text-neutral-800 text-[16px]">Showing
                <span
                    className="font-semibold"> {end}
                </span> out of
                <span
                    className="font-semibold"> {totalElements}
                </span>
            </p>

            <div className="flex gap-2">
                <button
                    onClick={() => onPageChange(number - 1)}
                    disabled={!hasPrevious}
                    className="inline-flex items-center justify-center bg-neutral-0 disabled:opacity-50 border border-neutral-200 rounded-[8px] p-[12px] group">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="w-[16px] h-[16px] text-neutral-800 group-disabled:text-neutral-200"
                    />
                </button>

                <button
                    onClick={() => onPageChange(number + 1)}
                    disabled={!hasNext}
                    className="inline-flex items-center justify-center bg-neutral-0 disabled:opacity-50 border border-neutral-200 rounded-[8px] p-[12px] group">
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="w-[16px] h-[16px] text-neutral-800 group-disabled:text-neutral-200"
                    />
                </button>
            </div>
        </div>
    );
}

export default Pagination;