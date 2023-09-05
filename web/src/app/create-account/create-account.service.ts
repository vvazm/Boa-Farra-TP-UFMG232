import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../login/login.service';
import { CreateAccount } from './create-account';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {


  constructor(private loginService: LoginService) {

  }

  submit(form: any): Boolean {
    this.loginService.loginStatus.next(true);

    console.log(form)

    return true;
  }

}
