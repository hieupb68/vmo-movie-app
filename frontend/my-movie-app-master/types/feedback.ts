export interface Feedback {
    id?: number;
    filmId?: number;
    comment?: string;
    username?: string;
    vote?: number;
    classification?: "Normal" | "Dirty";
}