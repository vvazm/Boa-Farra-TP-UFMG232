import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../modals/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  
  restAdress = 'http://localhost:4444/user';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  submit(form: any) {
    const postJSON = {
      username: form.username,
      password: form.password,
      confirm_password: form.confirm_password,
      email: form.email,
      picture: form.picture
    };  

    return this.http.post(this.restAdress, postJSON).pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', err.error.content); 
        throw err;
      })
    );
  }

  raiseDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message },
    });
  }
}
