import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../modals/dialog/dialog.component';
import { MyAccountService } from './my-account.service';
import { ChangePasswordComponent } from '../modals/changepassword/changepassword.component';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { fileToBase64 } from '../utils/fileToBase64';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  myAccountForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    picture: new FormControl('', [Validators.required])
  });

  constructor(
    private dialog: MatDialog, 
    private myAccountService: MyAccountService,
    private router: Router,
    private loginService: LoginService
  ) {

  }
  
  ngOnInit(): void {
    this.myAccountService.getMyAccount().pipe(
      catchError((err) => {
        this.router.navigate(['/']);
        throw err;
      })
    ).subscribe((res: any) => {
      this.myAccountForm.controls.username.setValue(res.content['key_username_user']);
      this.myAccountForm.controls.email.setValue(res.content['key_email_user']);
      this.myAccountForm.controls.picture.setValue(res.content['key_picture_user']);
    });
  }

  submit(): void {
    if (this.myAccountForm.valid) {
      this.myAccountService.submit(this.myAccountForm.getRawValue()).subscribe((res: any) => {	
        this.raiseDialog('Sucesso!', 'Conta atualizada.');
        this.loginService.setUserPicture(this.myAccountForm.controls.picture.value || '' );
      });
    } else {
      this.raiseDialog('Dados Inválidos', 'Verifique as informações');
    }
  }

  raiseDialog(title: string, message: string): void {
    this.dialog.open(DialogComponent, {
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
            this.myAccountForm.controls.picture.setValue(base64Value);
          })
          .catch(error => {
            this.raiseDialog('Ops!', error)
          });

           
        } else {
          this.raiseDialog('Arquivo Inválido', 'O arquivo deve possuir extensão .jpg')
        }     
    }
  }

  changePassword()  {
    this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      backdropClass: 'dialog-backdrop',
      data: {  },
    });
  }


}


