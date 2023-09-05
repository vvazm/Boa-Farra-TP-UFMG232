import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatus: BehaviorSubject<boolean>;

  constructor() {
    this.loginStatus = new BehaviorSubject<boolean>(false);
  }

  getUserPicture() {
    return '../../assets/testImages/leonardosalim.jpg';
  }

  login() {
    this.loginStatus.next(true);
  }

  logout() {
    this.loginStatus.next(false);
  }
}
