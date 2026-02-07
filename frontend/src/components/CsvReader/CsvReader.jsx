import Papa from "papaparse";

const CsvReader = ({id, render, onDataLoaded, data= []}) => {

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if(onDataLoaded) onDataLoaded(results.data);
            },
        });
        e.target.value = "";
    };

    return (
        <div className="w-full h-44 border border-neutral-200 rounded-2xl p-3 overflow-y-auto">

            <input id={id} type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />

            <div className="flex flex-wrap gap-2">
                {data.length
                    ? (
                        <>
                            {data.map((row, index) => (
                                <div key={index} className="text-base text-neutral-900">
                                    {render(row)}
                                </div>

                            ))}

                        </>
                    )
                    : <label htmlFor={id} className="text-center">+ Upload {id.toLowerCase()} via CSV</label>
                }

            </div>

        </div>
    );
}

export default CsvReader;