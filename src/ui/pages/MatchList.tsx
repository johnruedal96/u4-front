import { useMatches } from "@/application/hooks/useMatches";

import { useDeleteMatch } from "@/application/hooks/useDeleteMatch";
import type { Match } from "@/domain/match/match.model";
import { Dialog } from "@/ui/components/Dialog";
import { InputFilter } from "@/ui/components/InputFilter";
import { LoadingSpinner } from "@/ui/components/Loading";
import { MatchTable } from "@/ui/components/MatchTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const MatchList = () => {
    const { matches, loading, error, getMatches } = useMatches();
    const { deleteMatch, loading: loadingDelete } = useDeleteMatch()
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        sessionStorage.removeItem('matchToEdit')
    }, [])

    if (loading || loadingDelete) return <LoadingSpinner text="Cargando partidos" fullscreen />;
    if (error) return <p>Error: {error}</p>;

    const handleEdit = (match: Match) => {
        sessionStorage.setItem('matchToEdit', JSON.stringify(match))
        navigate('/matches/update')
    };

    const handleDelete = (match: Match) => {
        setSelectedMatch(match);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        if (selectedMatch) {
            await deleteMatch(selectedMatch.id)
            await getMatches()
        }
        closeDialog();
    };

    const closeDialog = () => {
        setShowConfirm(false);
        setSelectedMatch(null);
    };

    const removeAccents = (str: string): string => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const filtered = matches.filter((match) => {
        const matchText = removeAccents(
            `${match.id} ${match.equipoLocal} ${match.equipoVisitante} ${match.fase} ${match.ciudad} ${match.jugadorDestacado}`.toLowerCase()
        );
        const query = removeAccents(filter.toLowerCase());
        return matchText.includes(query);
    });

    return (
        <div className="overflow-x-auto px-4 py-8">
            <InputFilter setFilter={setFilter} value={filter}></InputFilter>
            <MatchTable handleDelete={handleDelete} handleEdit={handleEdit} matches={filtered}></MatchTable>

            <Dialog
                show={showConfirm}
                title="¿Eliminar partido?"
                message={
                    <>
                        ¿Estás seguro de que deseas eliminar el partido entre{" "}
                        <strong>{selectedMatch?.equipoLocal}</strong> y{" "}
                        <strong>{selectedMatch?.equipoVisitante}</strong>?
                    </>
                }
                onConfirm={confirmDelete}
                onCancel={closeDialog}
            />
        </div >
    );
}
