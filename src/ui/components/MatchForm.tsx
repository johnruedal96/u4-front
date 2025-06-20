import type { MatchFormData } from "@/domain/match/MatchFormData";
import { useState } from "react";

type Props = {
    initialValues?: MatchFormData;
    onSubmit: (data: MatchFormData) => void;
};

export const MatchForm = ({ initialValues, onSubmit }: Props) => {
    const [form, setForm] = useState<MatchFormData>(
        initialValues ?? {
            equipoLocal: "",
            equipoVisitante: "",
            equipoGanador: "",
            fecha: "",
            estadio: "",
            ciudad: "",
            fase: "",
            golesLocal: 0,
            golesVisitante: 0,
            jugadorDestacado: "",
            ternaArbitral: {
                principal: { nombre: "", nacionalidad: "" },
                asistente1: { nombre: "", nacionalidad: "" },
                asistente2: { nombre: "", nacionalidad: "" },
            },
        }
    );

    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleArbitroChange = (
        role: keyof MatchFormData["ternaArbitral"],
        field: keyof MatchFormData["ternaArbitral"]["principal"],
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            ternaArbitral: {
                ...prev.ternaArbitral,
                [role]: {
                    ...prev.ternaArbitral[role],
                    [field]: value,
                },
            },
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            "equipoLocal",
            "equipoVisitante",
            "equipoGanador",
            "fecha",
            "estadio",
            "ciudad",
            "fase",
            "jugadorDestacado",
        ];

        for (const field of requiredFields) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (!(form as any)[field]) {
                return `El campo "${field}" es obligatorio`;
            }
        }

        if (isNaN(form.golesLocal) || isNaN(form.golesVisitante)) {
            return "Los goles deben ser números válidos.";
        }

        for (const role of ["principal", "asistente1", "asistente2"] as const) {
            const arb = form.ternaArbitral[role];
            if (!arb.nombre || !arb.nacionalidad) {
                return `Completa todos los datos del árbitro ${role}`;
            }
        }

        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError(null);
        const newForm = { ...form }
        newForm.fecha = new Date(newForm.fecha).toISOString()
        onSubmit(newForm);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-4xl mx-auto"
        >
            <h2 className="text-2xl font-bold text-blue-700">
                {form.id ? "Editar Partido" : "Crear Partido"}
            </h2>

            {error && (
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    ["equipoLocal", "Equipo Local"],
                    ["equipoVisitante", "Equipo Visitante"],
                    ["equipoGanador", "Equipo Ganador"],
                    ["estadio", "Estadio"],
                    ["ciudad", "Ciudad"],
                    ["jugadorDestacado", "Jugador Destacado"],
                ].map(([name, label]) => (
                    <div key={name}>
                        <label className="text-sm text-gray-700 font-medium">{label}</label>
                        <input
                            name={name}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            value={(form as any)[name]}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                ))}

                <div>
                    <label className="text-sm text-gray-700 font-medium">Fase</label>
                    <select
                        name="fase"
                        value={form.fase}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        required
                    >
                        <option value="">Selecciona fase</option>
                        <option value="Fase de grupos">Fase de grupos</option>
                        <option value="Octavos de final">Octavos de final</option>
                        <option value="Cuartos de final">Cuartos de final</option>
                        <option value="Semifinal">Semifinal</option>
                        <option value="Final">Final</option>
                    </select>
                </div>

                <div>
                    <label className="text-sm text-gray-700 font-medium">Fecha</label>
                    <input
                        type="datetime-local"
                        name="fecha"
                        value={form.fecha}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 font-medium">Goles Local</label>
                    <input
                        type="number"
                        name="golesLocal"
                        value={form.golesLocal}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 font-medium">Goles Visitante</label>
                    <input
                        type="number"
                        name="golesVisitante"
                        value={form.golesVisitante}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        required
                    />
                </div>
            </div>

            <hr className="my-4" />

            <h3 className="text-lg font-semibold text-gray-800">Terna arbitral</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["principal", "asistente1", "asistente2"].map((role) => (
                    <div key={role}>
                        <label className="block text-gray-600 font-medium capitalize">
                            {role}
                        </label>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={form.ternaArbitral[role as keyof typeof form.ternaArbitral].nombre}
                            onChange={(e) =>
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                handleArbitroChange(role as any, "nombre", e.target.value)
                            }
                            className="w-full mt-1 px-3 py-2 border rounded-md"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nacionalidad"
                            value={form.ternaArbitral[role as keyof typeof form.ternaArbitral].nacionalidad}
                            onChange={(e) =>
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                handleArbitroChange(role as any, "nacionalidad", e.target.value)
                            }
                            className="w-full mt-2 px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
                >
                    {form.id ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
};