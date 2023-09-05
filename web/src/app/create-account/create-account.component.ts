import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../modals/dialog/dialog.component';
import { Router } from '@angular/router';
import { CreateAccountService } from './create-account.service';
import { PasswordStrengthValidator } from '../utils/password-strength.validator';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  createAccountForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, PasswordStrengthValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    picture: new FormControl('', [Validators.required])
  });

  constructor(private dialog: MatDialog, private createAccountService: CreateAccountService, private router: Router) {

  }

  submit(): void {
    if (this.createAccountForm.valid) {
      const result = this.createAccountService.submit(this.createAccountForm.getRawValue());
      if (result) {
        this.raiseDialog('Bem Vindo!', 'A sua conta foi criada com sucesso');
        this.router.navigate(['/']);
      } else {
        this.raiseDialog('Ops!', 'Algo deu errado, tente novamente mais tarde');
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
        if (file.name.includes('.jpg')) {
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

async function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64Data = event.target.result.toString().split(',')[1];
        resolve(base64Data);
      } else {
        reject(new Error('Erro ao ler o arquivo.'));
      }
    };

    reader.onerror = (event) => {
      reject(event.target?.error || new Error('Erro ao acessar o arquivo.'));
    };

    reader.readAsDataURL(file);
  });
}
