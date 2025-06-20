import { matchApi } from "@/infrastructure/api/match.api";
import { useState } from "react";

export const useDeleteMatch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteMatch = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await matchApi.deleteBayId(id);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data || "Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    return { deleteMatch, loading, error };
}