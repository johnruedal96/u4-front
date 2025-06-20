import type { MatchFormData } from "@/domain/match/MatchFormData";
import { matchApi } from "@/infrastructure/api/match.api";
import { useState } from "react";

export const useCreateMatch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createMatch = async (match: MatchFormData) => {
        setLoading(true);
        setError(null);
        try {
            await matchApi.create(match);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data || "Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    return { createMatch, loading, error };
}