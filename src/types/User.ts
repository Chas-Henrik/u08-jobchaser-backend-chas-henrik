export type User = {
    firstname: string;
    lastname: string;
    address?: string | null;
    postalCode?: string | null;
    city?: string | null;
    country?: string | null;
    phone: string;
    dateOfBirth?: string | null;
    email: string;
    password: string;
}
