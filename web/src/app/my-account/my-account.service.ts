import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DialogComponent } from '../modals/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {
  
  restAdress = 'http://localhost:4444/user';
  restAdressPUB = 'http://localhost:4444/pub';
  changePasswordAdress = 'http://localhost:4444/changePassword';
  changePasswordAdressPUB = 'http://localhost:4444/changePasswordPub';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  submit(form: any) {
    const postJSON = {
      username: form.username,
      password: form.password,
      email: form.email,
      picture: form.picture
    };

    return this.http.put(this.restAdress, postJSON)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Algo deu errado, tente novamente mais tarde');
        throw err;
      })
    )
  }

  submitPUB(form: any) {
    const postJSON = {
      name: form.username,
      password: form.password,
      email: form.email,
      picture: form.picture
    };

    return this.http.put(this.restAdressPUB, postJSON)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Algo deu errado, tente novamente mais tarde');
        throw err;
      })
    )
  }

  
  changePassword(newPassword: { last_password: string ; password: string; confirm_password: string; }) {
    return this.http.put(this.changePasswordAdress, newPassword)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Algo deu errado, tente novamente mais tarde');
        throw err;
      })
    )
  }


  getMyAccount() {
    return this.http.get(this.restAdress)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Erro ao recuperar dados do usuário, tente novamente mais tarde');
        throw err;
      })
    )
  }

  getMyPUBAccount() {
    return this.http.get(this.restAdressPUB)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Erro ao recuperar dados do usuário, tente novamente mais tarde');
        throw err;
      })
    )
  }


  
  getMyAccountByToken(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(this.restAdress, { headers })
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Erro ao recuperar dados do usuário, tente novamente mais tarde');
        throw err;
      })
    )
  }

    
  getMyPUBAccountByToken(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(this.restAdressPUB, { headers })
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Erro ao recuperar dados do usuário, tente novamente mais tarde');
        throw err;
      })
    )
  }

  raiseDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message },
    });
  }
}
