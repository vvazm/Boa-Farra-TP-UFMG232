import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Boa Farra!';

  loginStatus = false;
  userPicture = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginStatus = this.loginService.loginStatus.getValue();
    this.loginService.loginStatus.subscribe(loginStatus => {
      this.loginStatus = loginStatus;
    });
    this.loginService.userPicture.subscribe(userPicture => {
      this.userPicture = userPicture;
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
