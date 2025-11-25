import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons"

const Logo = () => {
    return (
        <div
            className="flex items-center justify-center bg-neutral-25 rounded-md p-1">
            <FontAwesomeIcon
                icon={faVideoCamera}
                className="text-dark-red text-xs sm:text-sm md:text-base"
            />
        </div>
    );
}

export default Logo;