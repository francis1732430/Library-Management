import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopupComponent } from '../../shared/components/confirmation-popup/confirmation-popup.component';
import { DataService, AlertService, UtilityService } from '../../services';
import { Book, UserSession } from '../../models';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  searchText: string = "";
  booksList: Book[] = [];
  userId: number = 0;
  isUrlHaveQueryParams: boolean = false;

  constructor(
    private api: DataService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private utility: UtilityService,
    private modalService: NgbModal,
  ) {
    this.route.queryParams
      .subscribe( (params) => {
        if (params.id) {
          this.isUrlHaveQueryParams = true;
        }
      }
    );

    this.utility.userProfileBehaviourSubject.subscribe((user: UserSession) => {
      this.userId = user.id;
    });
  }

  ngOnInit(): void {
    this.getAllBookList();
  }

  getAllBookList(): void {
    let url = null;
    if (this.searchText) {
      url = this.isUrlHaveQueryParams ?
      `book/getAllBooks?userId=${this.userId}&book_title=${this.searchText}&author=${this.searchText}&category=${this.searchText}` : `book/getAllBooks?book_title=${this.searchText}&author=${this.searchText}&category=${this.searchText}`;
    } else {
      url = this.isUrlHaveQueryParams ? `book/getAllBooks?userId=${this.userId}` : `book/getAllBooks`;
    }
    this.booksList = [];
    this.api.getRecord(url, {}).subscribe((res: any) => {
      this.booksList = res;
    }, (err) => {
      const errorMessage = err && err.error && err.error.message ? err.error.message : "";
      this.alert.error(errorMessage);
    });
  }

  borrowBook(bookId: number): void {
    this.api.post(`book/book-borrow/${this.userId}/${bookId}`, {}).subscribe(() => {
      this.getAllBookList();
    }, (err) => {
      const errorMessage = err && err.error && err.error.message ? err.error.message : "";
      this.alert.error(errorMessage);
    });
  }

  returnBook(bookId: number): void {
    this.api.post(`book/return-book/${this.userId}/${bookId}`, {}).subscribe(() => {
      this.getAllBookList();
    }, (err) => {
      const errorMessage = err && err.error && err.error.message ? err.error.message : "";
      this.alert.error(errorMessage);
    });
  }

  submit(bookId: number, status: string) {
    const modalRef = this.modalService.open(ConfirmationPopupComponent);
    modalRef.componentInstance.status = status;

    modalRef.result.then((result: any) => {
      if (status === 'Borrow' && result === 'ok') {
        this.borrowBook(bookId);
      } else if (status === 'Return' && result === 'ok') {
        this.returnBook(bookId);
      }
    }, (reason) => {
      console.log(reason);
    });
  }
}
