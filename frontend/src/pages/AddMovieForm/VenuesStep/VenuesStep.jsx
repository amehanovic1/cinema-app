import { useEffect, useState } from "react";
import { getCities } from "../../../services/cityService";
import { getVenuesByCityId } from "../../../services/venueService";
import { faBuilding, faClock, faLocationDot, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { times } from "../../../data/timesData";
import Select from "../../../components/Select/Select";

const VenuesStep = ({ formData, setFormData }) => {
    const [cities, setCities] = useState([]);
    const [venuesByRow, setVenuesByRow] = useState({});

    useEffect(() => {
        fetchCities();
        if (formData.projections.length === 0) {
            addNewRow();
        }
    }, []);

    const fetchCities = async () => {
        try {
            const res = await getCities();
            setCities(res);
        } catch (error) { console.log(error); }
    };

    const addNewRow = () => {
        setFormData(prev => ({
            ...prev,
            projections: [...prev.projections, { city: "", venueId: "", projectionTime: "" }]
        }));
    };

    const removeRow = (index) => {
        setFormData(prev => ({
            ...prev,
            projections: prev.projections.filter((_, i) => i !== index)
        }));
    };

    const handleRowChange = async (index, field, value) => {
        const updatedProjections = [...formData.projections];
        updatedProjections[index][field] = value;

        if (field === "city") {
            updatedProjections[index].venueId = "";
            const city = cities.find(c => c.name === value);
            if (city) {
                const res = await getVenuesByCityId({ cityId: city.id });
                setVenuesByRow(prev => ({ ...prev, [index]: res }));
            }
        }

        setFormData(prev => ({ ...prev, projections: updatedProjections }));
    };

    return (
        <div className="flex flex-col gap-4">
            {formData.projections.map((proj, index) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center p-3">

                    <Select
                        items={cities}
                        selectText="Select City"
                        icon={faLocationDot}
                        selectedValue={proj.city}
                        onChange={(value) => handleRowChange(index, "city", value)}
                    />
                    <Select
                        items={venuesByRow[index] || []}
                        selectText="Select Venue"
                        icon={faBuilding}
                        selectedValue={venuesByRow[index]?.find(v => v.id === proj.venueId)?.name || ""}
                        onChange={(value) => {
                            const selectedVenueObj = venuesByRow[index]?.find(v => v.name === value);
                            handleRowChange(index, "venueId", selectedVenueObj?.id);
                        }}
                        disabled={!proj.city}
                    />
                    <Select
                        items={times.map(time => ({ id: time, name: time }))}
                        selectText="Select Time"
                        icon={faClock}
                        selectedValue={proj.projectionTime}
                        onChange={(value) => handleRowChange(index, "projectionTime", value)}
                    />

                    <button
                        type="button"
                        onClick={() => removeRow(index)}
                        className="text-neutral-400 hover:text-dark-red transition-colors p-2"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addNewRow}
                className="text-center font-semibold text-sm md:text-base text-dark-red underline mt-2"
            >
                + Add Projection
            </button>
        </div>
    );
};

export default VenuesStep;