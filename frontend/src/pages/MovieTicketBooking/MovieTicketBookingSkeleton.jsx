const MovieTicketBookingSkeleton = () => {
    return (
        <div className="animate-pulse p-4 md:p-6 space-y-4">

            <div className="w-1/4 h-6 bg-neutral-200 rounded"></div>

            <div className="w-full h-1 flex rounded">
                <div className="bg-dark-red w-1/2 h-full"></div>
                <div className="bg-neutral-200 w-1/2 h-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                <div className="md:col-span-2 aspect-square bg-neutral-200 rounded-xl"></div>

                <div className="md:col-span-3 flex flex-col justify-between space-y-1">
                    <div className="w-2/3 h-5 bg-neutral-200 rounded"></div>
                    <div className="flex flex-wrap gap-2 mt-1">
                        <div className="w-10 h-3 bg-neutral-200 rounded"></div>
                        <div className="w-6 h-3 bg-neutral-200 rounded"></div>
                        <div className="w-8 h-3 bg-neutral-200 rounded"></div>
                    </div>
                </div>

                <div className="md:col-span-7 flex flex-col gap-1">
                    <div className="w-1/4 h-5 bg-neutral-200 rounded"></div>
                    <div className="flex flex-col gap-1 mt-1">
                        <div className="w-full h-3 bg-neutral-200 rounded"></div>
                        <div className="w-1/2 h-3 bg-neutral-200 rounded"></div>
                        <div className="w-1/3 h-3 bg-neutral-200 rounded"></div>
                    </div>
                </div>
            </div>

            <div className="w-full h-1 bg-neutral-200 my-2"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-4 m-4">


                <div className="md:row-span-3 flex flex-col items-center justify-start gap-2">
                    <div className="w-28 h-3 bg-neutral-200 rounded"></div>
                    <div className="w-full h-32 bg-neutral-200 rounded mt-1"></div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="w-20 h-3 bg-neutral-200 rounded mx-auto"></div>
                    <div className="w-full h-12 bg-neutral-200 rounded mt-1"></div>
                    <hr className="bg-neutral-200" />
                </div>

                <div className="flex flex-col text-center gap-1">
                    <div className="w-28 h-3 bg-neutral-200 rounded mx-auto"></div>
                    <div className="flex justify-between">
                        <div className="w-1/2 h-3 bg-neutral-200 rounded"></div>
                        <div className="w-1/2 h-3 bg-neutral-200 rounded"></div>
                    </div>
                    <hr className="bg-neutral-200" />
                    <div className="w-full h-8 bg-neutral-200 rounded mt-1"></div>
                </div>
            </div>

            <div className="flex gap-4 mt-2 justify-between">
                <div className="flex flex-col gap-1">
                    <div className="w-20 h-6 bg-neutral-100 rounded"></div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="w-28 h-6 bg-neutral-100 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default MovieTicketBookingSkeleton;
