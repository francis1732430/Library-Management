export class UserSession {
    id: number;
    user_name: string;
    email: string;
    mobile_number: string;
    address: string;
    profile_url: string;
    role_id: number;
    user_borrowed_books: string;

    constructor(
        id?: any,
        user_name?: any,
        email?: any,
        mobile_number?: any,
        address?: any,
        profile_url?: any,
        role_id?: any,
        user_borrowed_books?: any
        ) {
        this.id = id;
        this.user_name = user_name;
        this.email = email;
        this.mobile_number = mobile_number;
        this.address = address;
        this.profile_url = profile_url;
        this.role_id = role_id;
        this.user_borrowed_books = user_borrowed_books;
    }
}
