import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';



@NgModule({
  declarations: [
    ConfirmationPopupComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  entryComponents: [
    ConfirmationPopupComponent
  ],
  exports: [
    ConfirmationPopupComponent
  ]
})
export class ComponentsModule { }
