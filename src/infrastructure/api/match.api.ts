import type { Match } from "@/domain/match/match.model";
import type { MatchService } from "@/domain/match/match.service";

export const matchApi: MatchService = {
    async getAll(): Promise<Match[]> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/matches`);
        if (!response.ok) throw new Error("Failed to fetch matches");
        return response.json();
    },

    async deleteBayId(id: string): Promise<void> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/matches/${id}`, { method: 'delete' })
        if (!response.ok) throw new Error("Failed to delete match");
        return response.json();
    },

    async create(match: Match): Promise<Match> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/matches`, {
            method: 'post', body: JSON.stringify(match), headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) throw new Error("Failed to create match");
        return response.json();
    },

    async update(id: string, match: Match): Promise<Match> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/matches/${id}`, {
            method: 'put', body: JSON.stringify(match), headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) throw new Error("Failed to update match");
        return response.json();
    }
};