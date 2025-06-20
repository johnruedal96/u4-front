import type { MatchFormData } from "@/domain/match/MatchFormData";
import { matchApi } from "@/infrastructure/api/match.api";
import { useState } from "react";

export const useUpdateMatch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateMatch = async (id: string, match: MatchFormData) => {
        setLoading(true);
        setError(null);
        try {
            await matchApi.update(id, match);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data || "Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    return { updateMatch, loading, error };
}