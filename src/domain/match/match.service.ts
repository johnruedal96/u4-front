import type { Match } from "./match.model";
import type { MatchFormData } from "./MatchFormData";

export interface MatchService {
    getAll(): Promise<Match[]>;
    deleteBayId(id: string): Promise<void>;
    create(macth: MatchFormData): Promise<Match>;
    update(id: string, macth: MatchFormData): Promise<Match>
}