export const CardSkeleton = () => (
    <div className="flex flex-col justify-between items-center w-full animate-pulse">
        <div className="w-full aspect-square bg-neutral-200 rounded-xl" />

        <div className="w-full mt-2 flex flex-col items-start gap-2">
            <div className="h-4 w-3/4 bg-neutral-200 rounded" />
            <div className="h-3 w-1/2 bg-neutral-200 rounded" />
        </div>
        
    </div>
);
