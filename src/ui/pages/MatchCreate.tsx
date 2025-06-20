import { useCreateMatch } from "@/application/hooks/useCreateMatch"
import type { MatchFormData } from "@/domain/match/MatchFormData"
import { MatchForm } from "@/ui/components/MatchForm"
import { useNavigate } from "react-router"
import { LoadingSpinner } from "../components/Loading"

export const MatchCreate = () => {
    const { createMatch, error, loading } = useCreateMatch()
    const navigate = useNavigate()
    const onSubmit = async (data: MatchFormData) => {
        await createMatch(data)
        navigate('/')
    }


    if (loading) return <LoadingSpinner text="Registrando partido" fullscreen />;
    if (error) return <p>Error: {error}</p>;

    return (<MatchForm onSubmit={onSubmit} />)
}
