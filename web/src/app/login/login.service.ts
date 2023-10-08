import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { UserIdentity, UserStore } from './login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DialogComponent } from '../modals/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  restAdress = 'http://localhost:4444/auth';

  public loginStatus: BehaviorSubject<boolean>;
  private userIdentity: UserIdentity = { username: ''};
  private token: string = '';

  public userPicture: BehaviorSubject<string>;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    const userStore = localStorage.getItem('userStore');
    if (userStore) {
      const userStoreObj: UserStore = JSON.parse(userStore);
      this.loginStatus = new BehaviorSubject<boolean>(true);
      this.userPicture = new BehaviorSubject<string>(userStoreObj.picture);
      this.userIdentity = userStoreObj.identity;
      this.token = userStoreObj.token;
    } else {
      this.loginStatus = new BehaviorSubject<boolean>(false);
      this.userPicture = new BehaviorSubject<string>('');
      this.userIdentity = { username: '' };
    }
  }

  getUserName() {
    return this.userIdentity.username;
  }

  getUserPicture(): string {
    return this.userPicture.getValue();
  }

  setUserPicture(picture: string) {
    this.userPicture.next(picture);
  }

  getUserToken(): string {
    return this.token;
  }

  submit(username: string, password: string) {
    return this.http.post(this.restAdress, { username, password })
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.raiseDialog('Dados Inválidos!', 'Usuário ou senha incorretos');
        } else {
          this.raiseDialog('Ops!', 'Algo deu errado, tente novamente mais tarde');
        }
        throw err;
      })
    );
  }

  login(user: UserIdentity, picture: string, token: string) {
    this.userIdentity = user;
    this.token = token;
    this.userPicture.next(picture);
    this.loginStatus.next(true);

    const userStore: UserStore = {
      identity: user,
      picture,
      token
    }

    localStorage.setItem('userStore', JSON.stringify(userStore));
  }

  logout() {
    this.loginStatus.next(false);
    this.userIdentity = { username: ''};
    this.userPicture.next('');
    this.token = '';

    localStorage.setItem('userStore', '');
  }

  
  raiseDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message },
    });
  }
}
