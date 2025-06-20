import type { Match } from "@/domain/match/match.model";
// import { Match } from "@/domain/match/match.model";
import { matchApi } from "@/infrastructure/api/match.api";
import { useEffect, useState } from "react";

export const useMatches = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMatches()
    }, []);

    const getMatches = () => {
        setLoading(true);
        setError(null)
        matchApi.getAll()
            .then(setMatches)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }

    return { matches, loading, error, getMatches };
}