import type { Match } from "@/domain/match/match.model";

export interface MatchFormData extends Omit<Match, 'id'> {
    id?: string
}