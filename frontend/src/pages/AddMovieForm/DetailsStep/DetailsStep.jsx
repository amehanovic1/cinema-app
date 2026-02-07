import CsvReader from "../../../components/CsvReader/CsvReader";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DetailsStep = ({ formData, setFormData }) => {

    const handleWritersLoaded = (csvData) => {
        const formattedWriters = csvData
            .filter(item => item.firstName && item.lastName)
            .map(item => ({
                firstName: item.firstName.trim(),
                lastName: item.lastName.trim()
            }));

        setFormData(prev => ({
            ...prev,
            writers: formattedWriters
        }));
    };

    const handleCastLoaded = (csvData) => {
        const formattedCast = csvData.map(item => ({
            firstName: item.firstName,
            lastName: item.lastName,
            characterFullName: item.characterFullName,
            role: item.role ? item.role.toLowerCase() : "supporting"
        }));

        setFormData(prev => ({
            ...prev,
            cast: formattedCast
        }));
    };

    const handleImageUploadSuccess = (publicUrl, isCover = false) => {
        const newImage = {
            url: publicUrl,
            type: isCover ? "poster" : "extra"
        };

        setFormData(prev => ({
            ...prev,
            images: [...prev.images, newImage]
        }));
    };

    const handleSetPoster = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.map((img, i) => ({
                ...img,
                type: i === index ? "poster" : "extra"
            }))
        }));
    };

    const renderWriter = (writer) => (
        <span className="font-base text-neutral-900">{writer.firstName} {writer.lastName}</span>
    )

    const renderCast = (cast) => (
        <div className="flex flex-col">
            <span>{cast.firstName} {cast.lastName}</span>
            <span>{cast.characterFullName}</span>
        </div>
    )

    return (<>
        <div className="flex flex-col gap-4 ">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">

                    <div className="flex justify-between items-center px-1 text-sm">
                        <h1 className="font-semibold text-neutral-700">Writers</h1>
                        {formData.writers.length > 0 && (
                            <button onClick={() => setFormData(p => ({ ...p, writers: [] }))}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        )}
                    </div>
                    <CsvReader
                        id="writers"
                        render={(row) => renderWriter(row)}
                        data={formData.writers}
                        onDataLoaded={handleWritersLoaded}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center px-1 text-sm">
                        <h1 className="font-semibold text-neutral-700">Cast</h1>
                        {formData.cast.length > 0 && (
                            <button onClick={() => setFormData(p => ({ ...p, cast: [] }))}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        )}
                    </div>
                    <CsvReader
                        id="cast"
                        render={(row) => renderCast(row)}
                        data={formData.cast}
                        onDataLoaded={handleCastLoaded}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-base neutral-700">Upload Photos</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 border border-neutral-200 rounded-2xl p-4">
                    {[0, 1, 2, 3].map((_, index) => (
                        <div key={index} className="flex flex-col gap-2">

                            <ImageUpload onUploadSuccess={(url) => handleImageUploadSuccess(url)} />

                            {formData.images[index] && (
                                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-neutral-600 hover:text-dark-red">
                                    <input
                                        type="radio"
                                        name="coverImage"
                                        className="accent-dark-red w-4 h-4"
                                        checked={formData.images[index]?.type === "poster"}
                                        onChange={() => handleSetPoster(index)}
                                    />
                                    Cover Photo
                                </label>
                            )}


                        </div>
                    ))}
                </div>
            </div>
        </div >

    </>)

}

export default DetailsStep;