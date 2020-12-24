import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import { BackendService } from "../services/backend.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
    user: any = { mail: '', password: '' };
    isPassword: boolean = true;
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


    onLogin() {

        if (!this.user.mail || !this.user.password)
            this.showError('You must insert email and password');

        if (this.user.mail && this.user.password) {
            this.api.insert('Login', this.user).subscribe((res: any) => {
                if (res && res.user != null) {
                    sessionStorage.setItem("user", JSON.stringify(res.user))
                    sessionStorage.setItem('token', res.tokeninfo);
                    this.router.navigate(['/albums'])
                }
                else {
                    this.showError('Your email or password is incorect');
                }
            })

        }
    }

}
