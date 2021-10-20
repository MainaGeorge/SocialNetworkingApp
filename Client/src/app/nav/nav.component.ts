import { Component, OnInit } from '@angular/core';
import {AccountService} from "../services/account.service";
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(public accountService:AccountService) { }

  login(){
    this.accountService.login(this.model)
      .subscribe(resp =>
    {
      console.log(resp);
    }, err=> console.log(err));
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout()
  }
}
