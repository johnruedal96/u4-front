type LoadingSpinnerProps = {
    text?: string;
    size?: "sm" | "md" | "lg";
    fullscreen?: boolean;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text, size = "md", fullscreen = false, }) => {
    const spinnerSize = {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-4",
        lg: "h-10 w-10 border-4",
    };

    return (
        <div
            className={`${fullscreen
                    ? "fixed inset-0 flex items-center justify-center bg-white/70 z-50"
                    : "flex items-center justify-center py-4"
                }`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`animate-spin rounded-full border-t-transparent border-blue-500 ${spinnerSize[size]}`}
                />
                {text && <span className="text-gray-700 text-sm">{text}</span>}
            </div>
        </div>
    );
};