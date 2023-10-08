import { Component } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/utils/password-strength.validator';
import { DialogComponent } from '../dialog/dialog.component';
import { MyAccountService } from 'src/app/my-account/my-account.service';

@Component({
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangePasswordComponent {
  constructor(
    private dialog: MatDialog,
    private myAccountService: MyAccountService
  ) {}

  changePasswordForm = new FormGroup({
    last_password: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, PasswordStrengthValidator]),
    confirm_password: new FormControl('', [Validators.required])
  });

  submit(): void {
    if (this.changePasswordForm.valid) {
      const last_password = this.changePasswordForm.controls.last_password.value;
      const password = this.changePasswordForm.controls.password.value;
      const confirm_password = this.changePasswordForm.controls.confirm_password.value;

      if (last_password && password && confirm_password && password === confirm_password) {
        this.myAccountService.changePassword({last_password, password, confirm_password}).subscribe((res: any) => {
          this.raiseDialog('Sucesso!', 'Senha atualizada.');
        });
      } else {
        this.raiseDialog('Dados Inválidos', 'A confirmação de senha não confere');
      }
    } else {
      this.raiseDialog('Dados Inválidos', 'Verifique as informações');
    }
  }

  raiseDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      hasBackdrop: false,
      data: { title, message },
    });
  }

}