import { useEffect, useState } from 'react';

const Carousel = ({ items, getImage, renderItem = [], autoSlide = false, autoSlideInterval = 3000 }) => {

    const [activeIndex, setActiveIndex] = useState(0)

    const getFormattedId = (title, index) => {
        return (title || `slide-${index}`)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, "");
    };

    const gotToNextSlide = () => {
        setActiveIndex((prevIndex) => prevIndex === items.length - 1 ? 0 : prevIndex + 1)
    };
    const goToSlide = (index) => setActiveIndex(index);

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(gotToNextSlide, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [autoSlide, autoSlideInterval, items.length]);

    return (
        <div className='relative w-full h-full overflow-hidden' data-testid="carousel-main-container">
            <>
                <div className={`flex  h-full
                    ${activeIndex === 0 ? "" : "transition-transform duration-800 ease-in-out"}`}
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    data-testid="carousel-track"
                >

                    {items.map((item, index) => {

                        const slideId = getFormattedId(item.title, index);

                        return (
                            <div
                                key={index}
                                className="w-full flex-shrink-0 relative h-full"
                                data-testid={`carousel-slide-${slideId}`}
                            >
                                <img
                                    src={getImage(item)}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    data-testid={`carousel-img-${slideId}`}
                                />
                                {renderItem && renderItem(item)}
                            </div>
                        );
                    })}

                </div>

                <div
                    className='absolute bottom-4 sm:bottom-6 w-full flex justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 z-20'
                    data-testid="carousel-indicators-container"
                >
                    {items?.map((_, index) =>
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            data-testid={`carousel-indicator-dot-${index}`}
                            className={`rounded-full transition-colors duration-300
                                ${index === activeIndex
                                    ? "bg-neutral-50"
                                    : "bg-neutral-400"}
                                h-0.5 w-4 sm:h-1 sm:w-6 md:h-1.5 md:w-8 lg:h-2 lg:w-10`}>
                        </button>)
                    }
                </div>

            </>

        </div>
    );

}

export default Carousel;