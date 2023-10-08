import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './login.service';
import { DialogComponent } from '../modals/dialog/dialog.component';
import { Router } from '@angular/router';
import { MyAccountService } from '../my-account/my-account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private dialog: MatDialog, 
    private loginService: LoginService, 
    private router: Router,
    private myAccountService: MyAccountService
  ) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.controls.username.value || '';
      const password = this.loginForm.controls.password.value || '';

      this.loginService.submit(username, password).subscribe((resAuth: any) => {
        this.myAccountService.getMyAccountByToken(resAuth.content).subscribe((resAccount: any) => {
          this.loginService.login({ username }, resAccount.content['key_picture_user'],resAuth.content);
          this.router.navigate(['/']);
        });
      });
    } else {
      this.errorDialog('Dados Inválidos', 'Verifique as informações');
    }
  }
  

  errorDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message },
    });
  }

  criarConta(): void {

  }

}
