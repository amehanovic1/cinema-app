import { useEffect, useState } from 'react';
import { getCurrentlyShowingMovies } from '../services/MovieService';

function Carousel() {
    const [currentlyShowing, setCurrentlyShowing] = useState([])
    const [index, setIndex] = useState(0)

    const fetchCurrentlyShowing = async (page = 0, size = 3) => {
        try {
            const res = await getCurrentlyShowingMovies(page, size);
            setCurrentlyShowing(res.content);
            setIndex(0);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCurrentlyShowing();
    }, []);

    const currentMovie = currentlyShowing[index];

    return (
        <div className='relative w-full h-screen flex items-center justify-center'>
            {currentMovie ? (
                <>
                    <img
                        src={currentMovie.images.find((img) => img.type === "backdrop")?.url}
                        alt={currentMovie.name}
                        className="w-full h-full object-cover transition-transform duration-800">
                    </img>

                    <div className='absolute flex flex-col justify-start top-1/2 left-8 max-w-[550px] space-y-2 text-neutral-25 -translate-y-1/2'>
                        <h1 className='font-bold text-[48px]'>
                            {currentMovie?.title}
                        </h1>
                        <p className='font-bold text-[20px]'>
                            {currentMovie?.synopsis?.split('.')[0] + '.'}
                        </p>
                    </div>


                    <div className='absolute bottom-6 flex justify-center gap-4'>
                        {currentlyShowing?.map((_, id) =>
                            <button
                                key={id}
                                onClick={() => setIndex(id)}
                                className={`w-[30px] h-[4px] rounded-[4px] transition-colors duration-300
                                ${id === index ? "bg-neutral-50" : "bg-neutral-400"}`} >
                            </button>)
                        }
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );

}

export default Carousel;