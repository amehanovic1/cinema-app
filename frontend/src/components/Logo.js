import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons"

function Logo() {
    return (
        <div
            className="w-[26px] h-[24px] rounded-[8px] bg-neutral-25 flex items-center justify-center">
            <FontAwesomeIcon
                icon={faVideoCamera}
                className="w-[16px] h-[14px] text-red-dark"
            />
        </div>
    );
}

export default Logo;