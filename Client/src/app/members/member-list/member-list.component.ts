import { Component, OnInit } from '@angular/core';
import {MembersService} from "../../_services/members.service";
import {Member} from "../../_models/member";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  // @ts-ignore
  members: Member[];
  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.membersService.getUsers().subscribe(users => this.members = users);
  }

}
