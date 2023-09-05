import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Boa Farra!';

  loginStatus = false;
  userPicture = '';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginStatus = this.loginService.loginStatus.getValue();
    this.loginService.loginStatus.subscribe(loginStatus => {
      this.loginStatus = loginStatus;
      if (loginStatus) {
        this.userPicture = this.loginService.getUserPicture();
      } else {
        this.userPicture = '';
      }
    });
    
  }

  logout() {
    this.loginService.logout();
  }
}
