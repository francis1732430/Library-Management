export class Book {
    id: number;
    book_title: string;
    author: string;
    category: string;
    book_status: string;
    rack_number: string;
    book_url: string;
    createdAt: string;
    updatedAt: string;
    booksBorrows: any;

    constructor(
        id?: any,
        book_title?: any,
        author?: any,
        category?: any,
        book_status?: any,
        rack_number?: any,
        book_url?: any,
        createdAt?: any,
        updatedAt?: any,
        booksBorrows?: any
        ) {
        this.id = id;
        this.book_title = book_title;
        this.author = author;
        this.category = category;
        this.book_status = book_status;
        this.rack_number = rack_number;
        this.book_url = book_url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.booksBorrows = booksBorrows;
    }
}
