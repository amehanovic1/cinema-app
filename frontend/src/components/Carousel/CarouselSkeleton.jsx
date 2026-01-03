export const CarouselSkeleton = () => (
    <div className="w-full h-full bg-neutral-200 animate-pulse relative">

        <div className="absolute top-1/2 left-12 -translate-y-1/2 space-y-3">
            <div className="h-6 w-24 bg-neutral-300 rounded" />
            <div className="h-10 w-64 bg-neutral-300 rounded" />
            <div className="h-4 w-72 bg-neutral-300 rounded" />
        </div>

        <div className="absolute bottom-6 w-full flex justify-center">
            <div className="h-1 w-20 bg-neutral-300 rounded-full" />
        </div>
        
    </div>
);
