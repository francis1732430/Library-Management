import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, AlertService } from '../../services';
import { Book } from '../../models';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  searchText: string = "";
  booksList: Book[] = [];
  userId: string = "";

  constructor(
    private api: DataService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {
    this.route.queryParams
      .subscribe(params => {
        this.userId = params.id;
      }
    );
  }

  ngOnInit(): void {
    this.getAllBookList();
  }

  getAllBookList(): void {
    let url = null;
    if (this.searchText) {
      url = `book/getAllBooks?userId=${this.userId}&book_title=${this.searchText}&author=${this.searchText}&category=${this.searchText}`;
    } else {
      url = `book/getAllBooks?userId=${this.userId}`;
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
