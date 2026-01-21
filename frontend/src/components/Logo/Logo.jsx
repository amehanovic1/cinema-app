import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons"

const Logo = () => {
    return (
        <div
            className="flex items-center justify-center bg-neutral-25 rounded-md p-1" data-testid="app-logo">
            <FontAwesomeIcon
                icon={faVideoCamera}
                className="text-dark-red text-xs sm:text-sm md:text-base"
                data-testid="logo-icon"
            />
        </div>
    );
}

export default Logo;