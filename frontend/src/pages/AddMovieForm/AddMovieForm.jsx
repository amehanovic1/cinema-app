import GeneralStep from "./GeneralStep/GeneralStep";
import DetailsStep from "./DetailsStep/DetailsStep";
import VenuesStep from "./VenuesStep/VenuesStep";
import { useState } from "react";
import { saveDraft } from "../../services/movieDraftService";

const AddMovieForm = () => {
    const [activeStep, setActiveStep] = useState(0)
    const stepsConfig = [
        { id: "general", label: "General" },
        { id: "details", label: "Details" },
        { id: "venues", label: "Venues" },
    ];

    const [movieData, setMovieData] = useState({
        title: "",
        pgRating: "",
        language: "",
        durationInMinutes: null,
        projectionStartDate: "",
        projectionEndDate: "",
        directorFullName: "",
        trailerUrl: "",
        synopsis: "",
        genres: [],

        writers: [],
        cast: [],
        images: [],
        projections: []
    })

    const isStepValid = () => {
        if (activeStep === 0) {
            return (
                movieData.title &&
                movieData.pgRating &&
                movieData.language &&
                movieData.durationInMinutes &&
                movieData.projectionStartDate &&
                movieData.projectionEndDate &&
                movieData.directorFullName &&
                movieData.trailerUrl &&
                movieData.synopsis &&
                movieData.genres.length > 0
            );
        }

        if (activeStep === 1) {
            return (
                movieData.writers.length > 0 &&
                movieData.cast.length > 0 &&
                movieData.images.length > 0
            );
        }

        if (activeStep === 2) {
            return movieData.projections.length > 0 &&
                movieData.projections.every(p => p.venueId && p.projectionTime);;
        }

        return false;
    };

    const handleAddMovie = async () => {
        try {
            await saveDraft({
                step: stepsConfig[activeStep].id,
                data: { ...movieData, durationInMinutes: movieData.durationInMinutes ? parseInt(movieData.durationInMinutes) : null }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleNext = () => {
        if (activeStep < stepsConfig.length - 1) {
            setActiveStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
        }
    };

    return (
        <>
            <div className="max-w-5xl mx-auto p-4">
                <div className="flex items-center justify-center mb-10">
                    {stepsConfig.map((s, index) => (
                        <div key={s.id} className="flex items-center">
                            <div className="flex flex-col items-center gap-2">
                                <div className={`flex justify-center items-center border-2 rounded-full h-10 w-10 font-bold transition-all ${index < activeStep
                                    ? "bg-dark-red border-dark-red text-white"
                                    : index === activeStep
                                        ? "border-dark-red text-dark-red bg-transparent"
                                        : "border-neutral-300 text-neutral-300 bg-transparent"
                                    }`}>
                                    {index + 1}
                                </div>
                                <span className={`font-semibold text-sm ${index <= activeStep ? "text-neutral-800" : "text-neutral-400"}`}>
                                    {s.label}
                                </span>
                            </div>
                            {index < stepsConfig.length - 1 && (
                                <div className={`w-20 md:w-40 h-0.5 mx-2 transition-all ${index < activeStep ? "bg-dark-red" : "bg-neutral-200"}`}></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    {activeStep === 0 && <GeneralStep formData={movieData} setFormData={setMovieData} />}
                    {activeStep === 1 && <DetailsStep formData={movieData} setFormData={setMovieData} />}
                    {activeStep === 2 && <VenuesStep formData={movieData} setFormData={setMovieData} />}
                </div>

                <div className="flex-none flex justify-between mt-12 pt-6 border-t border-neutral-100 bg-white">
                    <button
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        className={`text-base underline ${activeStep === 0 ? "text-neutral-300" : "text-neutral-500 hover:text-dark-red"}`}
                    > Back </button>

                    <div className="flex gap-2 text-base font-regular">
                        <button
                            onClick={activeStep === 2 ? handleAddMovie : handleNext}
                            disabled={!isStepValid()}
                            className={`px-8 py-2 rounded-xl transition-all font-semibold shadow-sm
                                    ${!isStepValid()
                                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
                                    : "bg-dark-red text-white hover:bg-red-700 active:scale-95"}`}
                        >
                            {activeStep === 2 ? "Add Movie" : "Continue"}
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default AddMovieForm;
