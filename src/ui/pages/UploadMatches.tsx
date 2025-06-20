import { LoadingSpinner } from "@/ui/components/Loading";
import Papa from "papaparse";
import { useState } from "react";
import { useNavigate } from "react-router";

export const UploadMatches = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string[][]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        setFile(selected);
        setMessage(null);
        setError(null);
        setPreview([]);

        Papa.parse(selected, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            complete: (result: any) => {
                setPreview(result.data as string[][]);
            },
            skipEmptyLines: true,
        });
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Por favor selecciona un archivo CSV.");
            return;
        }

        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64 = btoa(reader.result as string);

                const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/matches/upload`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ file: base64 }),
                });

                await response.text();
                if (response.ok) {
                    setMessage("Archivo procesado correctamente.");
                    setFile(null);
                    setPreview([]);
                    navigate('/')
                } else {
                    setError("Error al procesar el archivo.");
                }

                setLoading(false);
            };

            reader.readAsBinaryString(file);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Error inesperado al leer o enviar el archivo.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">
                Carga múltiple de partidos
            </h1>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Selecciona un archivo CSV
                </label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100 transition"
                />
            </div>

            <div className="flex justify-end mb-4">
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition disabled:opacity-60"
                >
                    Subir archivo
                </button>
            </div>

            {loading && (
                <div className="my-4">
                    <LoadingSpinner text="Procesando archivo..." fullscreen={false} />
                </div>
            )}

            {message && (
                <p className="mt-4 text-green-600 font-medium bg-green-50 px-4 py-2 rounded-md border border-green-200">
                    {message}
                </p>
            )}
            {error && (
                <p className="mt-4 text-red-600 font-medium bg-red-50 px-4 py-2 rounded-md border border-red-200">
                    {error}
                </p>
            )}

            {preview.length > 0 && (
                <div className="mt-6 overflow-auto border border-gray-200 rounded-md">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 font-semibold">
                            <tr>
                                {preview[0].map((col, i) => (
                                    <th key={i} className="px-4 py-2 border-b">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {preview.slice(1).map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    {row.map((cell, j) => (
                                        <td key={j} className="px-4 py-2 border-b">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};