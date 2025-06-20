import { useEffect, useState, type ReactNode } from "react";

type ConfirmDialogProps = {
    show: boolean;
    title?: string;
    message: ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
};

export const Dialog = ({
    show,
    title = "Confirmar acción",
    message,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsMounted(true);
            setTimeout(() => setIsVisible(true), 20);
        } else {
            setIsVisible(false);
            setTimeout(() => setIsMounted(false), 200);
        }
    }, [show]);

    if (!isMounted) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? "bg-black bg-opacity-40 opacity-100" : "opacity-0"
                }`}
        >
            <div
                className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center space-y-4 transform transition-all duration-300 ${isVisible ? "scale-100" : "scale-95 opacity-0"
                    }`}
            >
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <div className="text-gray-600">{message}</div>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};