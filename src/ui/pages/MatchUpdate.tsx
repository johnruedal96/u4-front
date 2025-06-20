import { useUpdateMatch } from "@/application/hooks/useUpdateMatch"
import type { MatchFormData } from "@/domain/match/MatchFormData"
import { MatchForm } from "@/ui/components/MatchForm"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { LoadingSpinner } from "../components/Loading"

export const MatchUpdate = () => {
    const { updateMatch, error, loading } = useUpdateMatch()
    const [matchToEdit, setMatchToEdit] = useState<MatchFormData>(null)
    const navigate = useNavigate()
    const onSubmit = async (data: MatchFormData) => {
        await updateMatch(matchToEdit.id, data)
        navigate('/')
    }

    useEffect(() => {
        const match = JSON.parse(sessionStorage.getItem('matchToEdit')) as MatchFormData
        if (match) {
            match.fecha = toDatetimeLocalString(match.fecha)
            setMatchToEdit(match)
        } else {
            navigate('/')
        }
    }, [])

    const toDatetimeLocalString = (dateString: string): string => {
        const date = new Date(dateString);

        const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

        return offsetDate.toISOString().slice(0, 16);
    }


    if (loading) return <LoadingSpinner text="Actualizando partido" fullscreen />;
    if (error) return <p>Error: {error}</p>;
    if (!matchToEdit) return <span></span>

    return <MatchForm initialValues={matchToEdit} onSubmit={onSubmit} />
}
