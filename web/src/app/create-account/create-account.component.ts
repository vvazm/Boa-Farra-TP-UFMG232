import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../modals/dialog/dialog.component';
import { Router } from '@angular/router';
import { CreateAccountService } from './create-account.service';
import { PasswordStrengthValidator } from '../utils/password-strength.validator';
import { LoginService } from '../login/login.service';
import { fileToBase64 } from '../utils/fileToBase64';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  createAccountForm = new FormGroup({
    accountType: new FormControl('1', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, PasswordStrengthValidator]),
    confirm_password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    picture: new FormControl('', [Validators.required])
  });

  constructor(
    private dialog: MatDialog, 
    private createAccountService: CreateAccountService, 
    private loginService: LoginService,
    private router: Router
  ) { }

  submit(): void {
    if (this.createAccountForm.valid) {

      if (this.createAccountForm.controls.password.value !== this.createAccountForm.controls.confirm_password.value) {
        this.raiseDialog('Dados Inválidos', 'As senhas não conferem');
        return;
      }

      if (this.createAccountForm.controls.accountType.value === '1') {
        this.createAccountService.submit(this.createAccountForm.getRawValue()).subscribe((res: any) => {

          this.raiseDialog('Bem Vindo!', 'A sua conta foi criada com sucesso');
  
          const username = this.createAccountForm.controls.username.value || '';
          const password = this.createAccountForm.controls.password.value || '';  
  
          this.loginService.submit(username, password).subscribe((resLogin: any) => {
            this.loginService.login(
              { username: this.createAccountForm.controls.username.value, usertype: 'user'},
              this.createAccountForm.controls.picture.value || '', 
              resLogin.content.jwt
            );
            this.router.navigate(['/']);
          });
  
        });
      } else {
        this.createAccountService.submitPub(this.createAccountForm.getRawValue()).subscribe((res: any) => {

          this.raiseDialog('Bem Vindo!', 'A sua conta foi criada com sucesso');
  
          const username = this.createAccountForm.controls.username.value || '';
          const password = this.createAccountForm.controls.password.value || '';  
  
          this.loginService.submit(username, password).subscribe((resLogin: any) => {
            this.loginService.login(
              { username: this.createAccountForm.controls.username.value, usertype: 'pub'},
              this.createAccountForm.controls.picture.value || '', 
              resLogin.content.jwt
            );
            this.router.navigate(['/']);
          });
  
        });
      }


    


    } else {
      this.raiseDialog('Dados Inválidos', 'Verifique as informações');
    }
  }

  raiseDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message },
    });
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
        if (file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
          fileToBase64(file)
          .then(base64Value => {
            this.createAccountForm.controls.picture.setValue(base64Value);
          })
          .catch(error => {
            this.raiseDialog('Ops!', error)
          });

           
        } else {
          this.raiseDialog('Arquivo Inválido', 'O arquivo deve possuir extensão .jpg')
        }     
    }
  }

}

