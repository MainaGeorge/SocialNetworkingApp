import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from "../_models/member";

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getUsers(){
    return this.http.get<Member[]>(this.baseUrl + "users");
  }

  getUser(username: string){
    return this.http.get<Member>(this.baseUrl + "users/" + username);
  }

}
