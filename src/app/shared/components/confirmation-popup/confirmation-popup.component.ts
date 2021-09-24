import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {

  @Input() status: string = '';
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  submit(action: string) {
    this.activeModal.close(action);
  }
}
