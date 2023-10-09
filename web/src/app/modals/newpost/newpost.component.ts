import { Component } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/utils/password-strength.validator';
import { DialogComponent } from '../dialog/dialog.component';
import { MyAccountService } from 'src/app/my-account/my-account.service';
import { FeedService } from 'src/app/feed/feed.service';
import { fileToBase64 } from 'src/app/utils/fileToBase64';

@Component({
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss'],
})
export class NewPostComponent {
  constructor(
    private dialog: MatDialog,
    private feedService: FeedService
  ) {}

  newPostForm = new FormGroup({
    picture: new FormControl('', [Validators.required]),
  });

  submit(): void {
    if (this.newPostForm.valid) {
      console.log(this.newPostForm.getRawValue());
      this.feedService.addPost(this.newPostForm.getRawValue()).subscribe((res: any) => {
        this.raiseDialog('Sucesso!', 'Post adicionado com sucesso');
        this.close();
      });
    } else {
      this.raiseDialog('Dados Inválidos', 'Envie uma foto para continuar');
    }
  }

  raiseDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      hasBackdrop: false,
      data: { title, message },
    });
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
        if (file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
          fileToBase64(file)
          .then(base64Value => {
            this.newPostForm.controls.picture.setValue(base64Value);
          })
          .catch(error => {
            this.raiseDialog('Ops!', error)
          });

           
        } else {
          this.raiseDialog('Arquivo Inválido', 'O arquivo deve possuir extensão .jpg, .png ou .gif')
        }     
    }
  }

  close() {
    this.dialog.closeAll();
  }	


}