import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }


  cancel() {
    this.cancelRegister.emit(true);
  }

  register() {
      this.accountService.register(this.model).subscribe(resp => {
        this.cancel();
      });
  }
}
