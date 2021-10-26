import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ToastrModule} from "ngx-toastr";
import {NgxGalleryModule} from "@kolkov/ngx-gallery";
import {TabsModule} from "ngx-bootstrap/tabs";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true
    }),
    NgxGalleryModule,
    TabsModule
  ], exports: [
    ToastrModule,
    BsDropdownModule,
    NgxGalleryModule,
    TabsModule
  ]
})
export class SharedModule { }
