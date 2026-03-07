import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
}

const InteractiveHoverButton = React.forwardRef<
    HTMLButtonElement,
    InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "group relative w-full md:w-48 cursor-pointer overflow-hidden rounded-full border bg-transparent p-3 text-center font-bold transition-all duration-300",
                "border-[var(--glass-border)] hover:border-[var(--accent-color)]",
                className,
            )}
            style={{ backdropFilter: 'blur(10px)', color: 'var(--text-primary)' }}
            {...props}
        >
            <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                {text}
            </span>
            <div className="absolute top-0 left-0 z-10 flex h-full w-full -translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <span>{text}</span>
                <ArrowRight size={18} />
            </div>
            <div className="absolute left-[0%] top-[0%] h-full w-0 bg-[var(--accent-color)] transition-all duration-500 ease-out group-hover:w-full -z-10"></div>
        </button>
    );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
