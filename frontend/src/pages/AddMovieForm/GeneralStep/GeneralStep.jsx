import { faClock, faFilm, faLanguage, faLink, faR, faT, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import InputField from "../../../components/InputField/InputField";
import DateRangePicker from "../../../components/DateRangePicker/DateRangePicker";
import TextAreaField from "../../../components/TextAreaField/TextAreaField";
import Select from "../../../components/Select/Select";
import { language } from "../../../data/languageData"
import { pgRating } from "../../../data/pgRatingData"
import { getGenres } from "../../../services/genreService";

const GeneralStep = ({ formData, setFormData }) => {
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await getGenres();
                setGenres(res);
            } catch (error) {
                console.log(error);
            }
        }
        fetchGenres();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleDateChange = (dates) => {
        setFormData(prev => ({
            ...prev,
            projectionStartDate: dates.start,
            projectionEndDate: dates.end
        }));
    }

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>

            <div className="grid grid-cols-2 gap-4 w-full">
                <InputField
                    label="Movie Name"
                    type="text"
                    name="title"
                    placeholder="Type movie name"
                    icon={faFilm}
                    onChange={handleChange}
                    value={formData.title}
                />
                <div className="flex flex-col">
                    <label className="text-base font-semibold text-neutral-700">PG Rating</label>
                    <Select
                        items={pgRating}
                        selectText={"Choose PG Rating"}
                        icon={faR}
                        selectedValue={formData.pgRating}
                        onChange={(value) => handleSelectChange("pgRating", value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col">
                    <label className="text-base font-semibold text-neutral-700">Language</label>
                    <Select
                        items={language}
                        selectText={"Choose Language"}
                        icon={faLanguage}
                        selectedValue={formData.language}
                        onChange={(value) => handleSelectChange("language", value)}
                    />
                </div>
                <InputField
                    label="Movie duration"
                    type="text"
                    name="durationInMinutes"
                    placeholder="Type movie duration"
                    icon={faClock}
                    onChange={handleChange}
                    value={formData.durationInMinutes}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col">
                    <label className="text-base font-semibold text-neutral-700">Projection Date</label>
                    <DateRangePicker
                        initialStartDate={formData.projectionStartDate}
                        initialEndDate={formData.projectionEndDate}
                        onChangeSet={handleDateChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-base font-semibold text-neutral-700">Genre</label>
                    <Select
                        items={genres}
                        selectText={"Choose Genre"}
                        icon={faFilm}
                        selectedValue={selectedGenre}
                        onChange={(value) => {
                            setSelectedGenre(value);
                            const selected = genres.find(g => g.name === value);
                            handleSelectChange("genres", selected ? [selected.id] : [""]);
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
                <InputField
                    label="Director"
                    type="text"
                    name="directorFullName"
                    placeholder="Add director"
                    icon={faUser}
                    onChange={handleChange}
                    value={formData.directorFullName}
                />
                <InputField
                    label="Trailer"
                    type="text"
                    name="trailerUrl"
                    placeholder="Insert trailer link"
                    icon={faLink}
                    onChange={handleChange}
                    value={formData.trailerUrl}
                />
            </div>

            <TextAreaField
                label="Synopsis"
                type="text"
                name="synopsis"
                placeholder="Write synopsis"
                icon={faT}
                onChange={handleChange}
                value={formData.synopsis}
            />

        </form>


    );

}


export default GeneralStep;