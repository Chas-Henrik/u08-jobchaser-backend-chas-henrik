export type Job = {
    id: string;
    user_id: number;
    employer: string;
    logo_url?: string | null;
    headline?: string | null;
    position?: string | null;
    role?: string;
    posted?: Date | null;
    expires?: Date | null;
    contract: string;
    city?: string | null;
    region?: string | null;
    country?: string | null;
    url: string;
}
