export type User = {
    firstname: string;
    lastname: string;
    address?: string | null;
    postalcode?: string | null;
    city?: string | null;
    country?: string | null;
    phone: string;
    dob?: Date | null;
    email: string;
    password: string;
}

