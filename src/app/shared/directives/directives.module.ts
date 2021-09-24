import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPermissionDirective } from './roles-permission.directive';



@NgModule({
  declarations: [
    RolesPermissionDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RolesPermissionDirective
  ]
})
export class DirectivesModule { }
