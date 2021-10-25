import { Component, OnInit } from '@angular/core';
import {AccountService} from "../_services/account.service";
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(public accountService:AccountService, private router: Router,
              private toastr: ToastrService) { }

  login(){
    this.accountService.login(this.model)
      .subscribe(resp => this.router.navigateByUrl("/members").then(() => this.toastr.success("you have signed in")));
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout()
    this.router.navigateByUrl("/").then(() => this.toastr.success("you have been logged out"));
  }
}
