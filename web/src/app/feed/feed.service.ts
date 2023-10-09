import { Injectable } from '@angular/core';

import { CheckinRequest, Feed, PostRequest } from './feed';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { DialogComponent } from '../modals/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  restAdress = 'http://localhost:4444/post';
  restAdressCheckin = 'http://localhost:4444/checkin';
  restAdressCheckinByPost = 'http://localhost:4444/postCheckins';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {

  }

  addPost(form: any) {
    const postRequest: PostRequest = {
      picture: form.picture
    };

    return this.http.post(this.restAdress, postRequest)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Algo deu errado, tente novamente mais tarde');
        throw err;
      })
    )
  }

  addCheckin(form: any) {
    const checkinRequest: CheckinRequest = {
      picture: form.picture,
      post: form.post
    };

    return this.http.post(this.restAdressCheckin, checkinRequest)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Algo deu errado, tente novamente mais tarde');
        throw err;
      })
    )
  }

  getPosts() {
    return this.http.get(this.restAdress)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Não foi possível recuperar os posts, tente novamente mais tarde');
        throw err;
      })
    );
  }

  getPostCheckins(id: string) {
    return this.http.get(this.restAdressCheckinByPost + '/' + id)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Não foi possível recuperar os checkins, tente novamente mais tarde');
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
