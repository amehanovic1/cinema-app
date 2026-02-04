import { format } from "date-fns";
import SuccessIcon from "../../../components/icons/SuccessIcon";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const UpcomingMovieSection = ({ movie }) => {
    return (
        <div className="flex flex-col justify-center items-center m-4">
            <h1 className="text-center font-bold text-neutral-700 text-xl md:text-2xl">
                {movie.title} is coming in {format(movie.projectionStartDate, 'MMMM')}!
            </h1>

            <div className="mt-20">
                <SuccessIcon icon={faBell} type="light" />
            </div>

        </div>
    )
}

export default UpcomingMovieSection;