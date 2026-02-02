import { format } from "date-fns";
import SuccessIcon from "../../../components/icons/SuccessIcon";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const UpcomingMovieSection = ({ movie }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-neutral-900 text-xl md:text-2xl">
                {movie.title} is coming in {format(movie.projectionStartDate, 'MMMM')}!
            </h1>

            <div className="mt-20">
                <SuccessIcon icon={faBell} isLight={true} />
            </div>

        </div>
    )
}

export default UpcomingMovieSection;