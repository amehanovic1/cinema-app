const MovieDetailsSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 m-4 sm:m-6 md:m-8 lg:m-12 animate-pulse">

            <div className="w-48 h-6 bg-neutral-200 rounded-md mb-2" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="w-full aspect-video bg-neutral-200 rounded-tl-xl rounded-bl-xl" />

                <div className="grid grid-cols-2 gap-2">
                    <div className="w-full h-full bg-neutral-200" />
                    <div className="w-full h-full bg-neutral-200 rounded-tr-xl" />
                    <div className="w-full h-full bg-neutral-200" />
                    <div className="w-full h-full bg-neutral-200 rounded-br-xl" />
                </div>

                <div className="flex flex-col gap-4">

                    <div className="w-2/3 h-8 bg-neutral-200 rounded-md" />

                    <div className="flex gap-2 flex-wrap">
                        <div className="w-20 h-4 bg-neutral-200 rounded" />
                        <div className="w-24 h-4 bg-neutral-200 rounded" />
                        <div className="w-16 h-4 bg-neutral-200 rounded" />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="w-16 h-6 bg-neutral-200 rounded-lg" />
                        ))}
                    </div>

                    <div className="w-full h-20 bg-neutral-200 rounded-md" />

                    <div className="w-1/2 h-4 bg-neutral-200 rounded" />
                    <div className="w-2/3 h-4 bg-neutral-200 rounded" />

                    <div className="w-24 h-5 bg-neutral-200 rounded-md mt-2" />
                    <div className="grid grid-cols-3 gap-4">
                        {Array(6).fill(0).map((_, i) => (
                            <div key={i} className="h-10 bg-neutral-200 rounded-md" />
                        ))}
                    </div>

                    <div className="w-24 h-5 bg-neutral-200 rounded-md mt-2" />
                    <div className="flex gap-4 flex-wrap">
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="w-32 h-12 bg-neutral-200 rounded-lg" />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-4 border border-neutral-200 rounded-xl">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-10 bg-neutral-200 rounded-md" />
                        <div className="h-10 bg-neutral-200 rounded-md" />
                    </div>

                    <div className="h-10 bg-neutral-200 rounded-md" />

                    <div className="mt-6">
                        <div className="w-24 h-5 bg-neutral-200 rounded-md mb-2" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MovieDetailsSkeleton;
