import { useEffect, useState } from 'react';
import { getAllVenues } from '../../../services/venueService';
import { formatForId } from "../../../utils/testUtils";

const VenueButtonList = () => {

    const [venues, setVenues] = useState({})

    useEffect(() => {
        fetchVenues();
    }, []);


    const fetchVenues = async (page = 0, size = 10) => {
        try {
            const res = await getAllVenues({ page, size });
            setVenues(res);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className='flex overflow-x-auto flex-nowrap items-center justify-center bg-neutral-25 py-2 no-scrollbar'
            data-testid="venue-list-container"
        >
            <div className='flex items-center gap-4 p-2 min-w-max'>
                {
                    venues?.content?.map((venue, index) =>
                        <button
                            key={venue.id}
                            data-testid={`venue-button-${formatForId(venue.name)}`}
                            className='bg-neutral-25 px-4 py-2 border border-neutral-200 rounded-lg cursor-default pointer-events-none font-urbanist font-bold text-base sm:text-lg md:text-xl text-neutral-400'>
                            {venue.name}
                        </button>
                    )
                }
            </div>
        </div>
    );

}

export default VenueButtonList;