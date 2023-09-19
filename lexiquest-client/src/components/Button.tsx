import {useCallback} from "react";

export function Button(props: {
    text: string
    onClick?: () => void
}) {
    const click = useCallback(() => {
        if (!!props.onClick) props.onClick();
    }, [props]);

    return (
        <button type={"button"} onClick={click} className={[
            "w-full", "h-12", "px-4",
            "bg-white", "shadow-xl", "rounded-lg",
            "transition-all",
            "hover:bg-blue-100", "active:shadow-none"
        ].join(" ")}>
            <p>{props.text}</p>
        </button>
    );
}
