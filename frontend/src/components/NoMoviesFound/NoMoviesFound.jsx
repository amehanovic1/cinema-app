import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

const NoMoviesFound = () => {
    return (
        <div className="w-full flex items-center justify-center bg-neutral-0 
                        rounded-3xl border-neutarl-200 shadow-input">

            <div className="max-w-xl flex flex-col gap-4 items-center justify-center 
                            text-xs sm:text-sm md:text-base lg:text-lg p-6">
                <FontAwesomeIcon
                    icon={faFilm}
                    className="w-5 h-5 sm:w-10 sm:h-10 md:w-15 md:h-15 text-neutral-600"
                />

                <h1 className="font-semibold text-neutral-800">
                    No movies to preview for current date
                </h1>

                <p className="font-normal text-neutral-600 text-center">
                    We are working on updating our schedule for upcoming movies. Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!
                </p>

                <h1 className="font-semibold text-dark-red underline">
                    Explore Upcoming Movies
                </h1>
            </div>

        </div>
    );


}


export default NoMoviesFound;