import { Component, Inject, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/utils/password-strength.validator';
import { DialogComponent } from '../dialog/dialog.component';
import { MyAccountService } from 'src/app/my-account/my-account.service';
import { FeedService } from 'src/app/feed/feed.service';
import { fileToBase64 } from 'src/app/utils/fileToBase64';
import { Feed } from 'src/app/feed/feed';

@Component({
  templateUrl: './newcheckin.component.html',
  styleUrls: ['./newcheckin.component.scss'],
})
export class NewCheckinComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { feed: Feed },
    private dialog: MatDialog,
    private feedService: FeedService
  ) {}

  newCheckinForm = new FormGroup({
    picture: new FormControl('', [Validators.required]),
    post: new FormControl(null, [Validators.required]),
  });

  submit(): void {
    if (this.newCheckinForm.valid) {
      console.log(this.newCheckinForm.getRawValue());
      this.feedService.addCheckin(this.newCheckinForm.getRawValue()).subscribe((res: any) => {
        this.raiseDialog('Sucesso!', 'Checkin adicionado com sucesso');
        this.close();
      });
    } else {
      this.raiseDialog('Dados Inválidos', 'Verifique os erros no formulário');
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
            this.newCheckinForm.controls.picture.setValue(base64Value);
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