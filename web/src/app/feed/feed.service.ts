import { Injectable } from '@angular/core';

import { Feed, PostRequest } from './feed';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { DialogComponent } from '../modals/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  restAdress = 'http://localhost:4444/post';

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

  getPosts() {
    return this.http.get(this.restAdress)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        this.raiseDialog('Ops!', 'Não foi possível recuperar os posts, tente novamente mais tarde');
        throw err;
      })
    );
  }

  loadFeed(): Feed {
    const feed: Feed = {
      highlight: undefined,
      posts: [
        {
          barName: 'Pingucos e Alcolatras Não Anonimos Bar',
          barPicture: '1',
          carrousel: [
          ],
          people: [
          ]
        },
          {
            barName: 'Copo Sujo Ultra Beer',
            barPicture: '2',
            carrousel: [
            ]
          }
      ]
    }

    return feed;
  }

  raiseDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message },
    });
  }
  
}
