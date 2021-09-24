import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopupComponent } from '../../shared/components/confirmation-popup/confirmation-popup.component';
import { DataService, AlertService, UtilityService } from '../../services';
import { Book, UserSession } from '../../models';

@Component({
  selector: 'app-borrow-books',
  templateUrl: './books-by-status.component.html',
  styleUrls: ['./books-by-status.component.scss']
})
export class BooksByStatusComponent implements OnInit {

  searchText: string = "";
  booksList: Book[] = [];
  bookStatus: string = '';
  userId: number = 0;
  isHistory: boolean = false;

  constructor(
    private api: DataService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private utility: UtilityService,
    private modalService: NgbModal,
  ) { 
    this.route.queryParams
      .subscribe(params => {
        if (params.bookStatus) {
          this.bookStatus = params.bookStatus;
        } else if (params.history) {
          this.isHistory = true;
        }
      }
    );

    this.utility.userProfileBehaviourSubject.subscribe((user: UserSession) => {
      this.userId = user.id;
    });
  }

  ngOnInit(): void {
    if (this.isHistory) {
      this.getAllBookHistoryList();
    } else {
      this.getAllBookList();
    }
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

  getAllBookHistoryList(): void {
    let url = 'book/getBookHistory';

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
