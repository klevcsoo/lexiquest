export function Legend() {
    return (
        <div className="h-min mx-4 p-4 flex flex-col gap-2 bg-white shadow-md rounded-lg">
            <div className="w-full flex flex-row gap-2 items-center justify-start">
                <div className="w-8 h-8 bg-green-100 rounded-lg border border-green-200"></div>
                <p>helyes karakter</p>
            </div>
            <div className="w-full flex flex-row gap-2 items-center justify-start">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg border border-yellow-200"></div>
                <p>helytelen karakter</p>
            </div>
            <div className="w-full flex flex-row gap-2 items-center justify-start">
                <div className="w-8 h-8 bg-red-100 rounded-lg border border-red-200"></div>
                <p>karakter nincs a szóban</p>
            </div>
            <p></p>
        </div>
    );
}
