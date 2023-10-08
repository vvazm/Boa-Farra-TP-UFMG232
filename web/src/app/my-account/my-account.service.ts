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

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

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

  raiseDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message },
    });
  }
}
