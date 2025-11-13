import { useEffect, useState } from 'react';
import { getAllVenues } from '../services/venueService';

function VenueButtonList() {

    const [venues, setVenues] = useState({})

    const fetchVenues = async (page = 0, size = 10) => {
        try {
            const res = await getAllVenues(page, size);
            setVenues(res);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchVenues();
    }, []);

    return (
        <div className='min-h-[160px] flex overflow-x-auto flex-nowrap items-center justify-start bg-neutral-25 no-scrollbar'>
            <div className='flex items-center gap-[40px] p-[8px] min-w-max'>
                {
                    venues?.content?.map((venue) =>
                        <button
                            key={venue.id}
                            className='bg-neutral-25 p-[16px] border border-neutral-200 rounded-[8px] cursor-default pointer-events-none font-urbanist font-bold text-[24px] text-neutral-400'>
                            {venue.name}
                        </button>)
                }
            </div>
        </div>
    );

}

export default VenueButtonList;