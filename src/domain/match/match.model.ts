import type { Referee } from "@/domain/match/referee.model";

export interface Match {
    id: string;
    equipoLocal: string;
    equipoVisitante: string;
    equipoGanador: string;
    fecha: string;
    estadio: string;
    ciudad: string;
    fase: string;
    golesLocal: number;
    golesVisitante: number;
    jugadorDestacado: string;
    ternaArbitral: {
        principal: Referee;
        asistente1: Referee;
        asistente2: Referee;
    };
}