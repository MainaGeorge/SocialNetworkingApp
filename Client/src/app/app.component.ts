import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountService} from "./_services/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Client';
  users: any;

  constructor(private http:HttpClient, private accountService: AccountService) {
  }


  ngOnInit(): void {
    this.setUser();
  }

  setUser(){
    const user = localStorage.getItem('user');
    if(user){
      this.accountService.setUser(JSON.parse(user));
    }
  }
}
