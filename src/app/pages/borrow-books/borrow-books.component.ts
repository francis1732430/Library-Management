import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, AlertService } from '../../services';
import { Book } from '../../models';

@Component({
  selector: 'app-borrow-books',
  templateUrl: './borrow-books.component.html',
  styleUrls: ['./borrow-books.component.scss']
})
export class BorrowBooksComponent implements OnInit {

  searchText: string = "";
  booksList: Book[] = [];
  bookStatus: string = '';

  constructor(
    private api: DataService,
    private alert: AlertService,
    private route: ActivatedRoute
  ) { 
    this.route.queryParams
      .subscribe(params => {
        this.bookStatus = params.bookStatus;
      }
    );
  }

  ngOnInit(): void {
    this.getAllBookList();
  }

  getAllBookList(): void {
    let url = null;
    if (this.searchText) {
      url = `book/getAllBorrowedBooks?bookStatus=${this.bookStatus}&book_title=${this.searchText}&author=${this.searchText}&category=${this.searchText}`;
    } else {
      url = `book/getAllBorrowedBooks?bookStatus=${this.bookStatus}`;
    }
    this.booksList = [];
    this.api.getRecord(url, {}).subscribe((res: any) => {
      this.booksList = res;
    }, (err) => {
      const errorMessage = err && err.error && err.error.message ? err.error.message : "";
      this.alert.error(errorMessage);
    });
  }
}
