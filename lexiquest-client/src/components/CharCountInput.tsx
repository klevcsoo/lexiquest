export function CharCountInput(props: {
    value: number
    onAdd(addition: number): void
}) {
    return (
        <div className={"flex flex-row justify-center gap-2 max-w-min h-16"}>
            <ArrowButton onClick={() => props.onAdd(-1)}/>
            <div className={[
                "grid", "place-content-center", "w-24", "h-full",
                "bg-white", "shadow-xl", "rounded-lg"
            ].join(" ")}>
                <p className={"text-5xl text-center select-none"}>
                    <b>{props.value}</b>
                </p>
            </div>
            <ArrowButton directionUp onClick={() => props.onAdd(+1)}/>
        </div>
    );
}

function ArrowButton(props: {
    directionUp?: boolean
    onClick(): void
}) {
    return (
        <button className={[
            "w-12", "h-full", "text-3xl",
            "grid", "place-content-center",
            "bg-white", "shadow-xl", "rounded-lg",
            "transition-all",
            "hover:bg-blue-100", "active:shadow-none"
        ].join(" ")} onClick={props.onClick}>
            {props.directionUp ? (
                <span className="material-symbols-rounded">
                    arrow_forward_ios
                </span>
            ) : (
                <span className="material-symbols-rounded">
                    arrow_back_ios_new
                </span>
            )}
        </button>
    );
}
