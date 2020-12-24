import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { BackendService } from "../services/backend.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {
   private user: any = {
        name: '',
        password:'',
        confpassword: '',
        mail:''
    };
   constructor(private messageService: MessageService, private router: Router, private api: BackendService) { }

  ngOnInit() {
  }
  showError(msg) {
      this.messageService.clear();
      this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: msg,
          life: 4000
      });
  }
  isValid() {
      return this.user.password == this.user.confpassword && this.user.password != '' && this.user.mail != ''; 
  }
  onSignUp()
  {
      if (this.isValid()) {
          var dataToSend = {
              name: this.user.name,
              password: this.user.password,
              mail: this.user.mail
          };
          this.api.insert('Registration', dataToSend).subscribe((res: any) => {
              if (res && res.user.id != 0) {
                  sessionStorage.setItem("user", JSON.stringify(res.user))
                  sessionStorage.setItem('token', res.tokeninfo);
                  this.router.navigate(['/albums'])
              }
          })
      }
      else {
          if (this.user.password != this.user.confpassword)
              this.showError('Your confirm password is incorrect')
          else
              this.showError('All fields required')
      }
  }
}
