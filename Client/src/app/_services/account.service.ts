import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReplaySubject} from "rxjs";
import {User} from "../_models/user";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  baseUrl = environment.apiUrl + "account";

  constructor(private http:HttpClient) { }

  login(model: any){
    return this.http.post<User>(`${this.baseUrl}/login`, model)
      .pipe(
        map((resp: User) => {
          const user = resp;
          if(user){
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      )
  }

  logout(){
    localStorage.removeItem('user');
    // @ts-ignore
    this.currentUserSource.next(null);
  }

  setUser(user: User){
   this.currentUserSource.next(user);
  }

  register(model: any){
    return this.http.post<User>(`${this.baseUrl}/register`, model)
      .pipe(
        map( (response:User) => {
          if(response){
            localStorage.setItem('user', JSON.stringify(response));
            this.currentUserSource.next(response);
          }
        })
      );
  }
}
