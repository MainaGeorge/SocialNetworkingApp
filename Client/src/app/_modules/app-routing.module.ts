import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {MessagesComponent} from "../messages/messages.component";
import {ListsComponent} from "../lists/lists.component";
import {MemberListComponent} from "../members/member-list/member-list.component";
import {MemberDetailComponent} from "../members/member-detail/member-detail.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "messages", component: MessagesComponent},
  {path: "lists", component:ListsComponent},
  {path: "members", component: MemberListComponent},
  {path: "members/:username", component: MemberDetailComponent},
  {path: "**", component: HomeComponent, pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
