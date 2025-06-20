import type { Match } from "@/domain/match/match.model";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

interface MatchTableProps {
    handleEdit?: (match: Match) => void,
    handleDelete?: (match: Match) => void,
    matches: Match[]
}

export const MatchTable: React.FC<MatchTableProps> = ({ matches, handleDelete = () => null, handleEdit = () => null }) => {

    return (
        <div className="overflow-x-auto px-4 py-8">
            <table className="min-w-full table-auto border-collapse rounded-xl overflow-hidden shadow-sm">
                <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    <tr>
                        <th className="px-4 py-2">Fecha</th>
                        <th className="px-4 py-2">Local</th>
                        <th className="px-4 py-2">Visitante</th>
                        <th className="px-4 py-2">Resultado</th>
                        <th className="px-4 py-2">Fase</th>
                        <th className="px-4 py-2">Ganador</th>
                        <th className="px-4 py-2">Estadio</th>
                        <th className="px-4 py-2">Ciudad</th>
                        <th className="px-4 py-2">Jugador destacado</th>
                        <th className="px-4 py-2">Árbitro principal</th>
                        <th className="px-4 py-2">Árbitro Asistente 1</th>
                        <th className="px-4 py-2">Árbitro Asistente 2</th>
                        <th className="px-4 py-2 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                    {matches.map((match, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap">{format(new Date(match.fecha), "dd MMM yyyy")}</td>
                            <td className="px-4 py-2">{match.equipoLocal}</td>
                            <td className="px-4 py-2">{match.equipoVisitante}</td>
                            <td className="px-4 py-2">
                                {match.golesLocal} - {match.golesVisitante}
                            </td>
                            <td className="px-4 py-2">{match.fase}</td>
                            <td className="px-4 py-2">{match.equipoGanador}</td>
                            <td className="px-4 py-2">{match.estadio}</td>
                            <td className="px-4 py-2">{match.ciudad}</td>
                            <td className="px-4 py-2">{match.jugadorDestacado}</td>
                            <td className="px-4 py-2">
                                {match.ternaArbitral.principal.nombre} ({match.ternaArbitral.principal.nacionalidad})
                            </td>
                            <td className="px-4 py-2">
                                {match.ternaArbitral.asistente1.nombre} ({match.ternaArbitral.asistente1.nacionalidad})
                            </td>
                            <td className="px-4 py-2">
                                {match.ternaArbitral.asistente2.nombre} ({match.ternaArbitral.asistente2.nacionalidad})
                            </td>
                            <td className="px-4 py-2 text-center space-x-2">
                                <button
                                    onClick={() => handleEdit(match)}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="Editar"
                                >
                                    <PencilIcon className="w-5 h-5 inline" />
                                </button>
                                <button
                                    onClick={() => handleDelete(match)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Eliminar"
                                >
                                    <TrashIcon className="w-5 h-5 inline" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};