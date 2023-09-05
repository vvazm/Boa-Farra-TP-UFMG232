import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './login.service';
import { DialogComponent } from '../modals/dialog/dialog.component';
import { Router } from '@angular/router';
import { LoadOverlayService } from '../utils/load-overlay-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private dialog: MatDialog, private loginService: LoginService, private router: Router, private loadOverlayService: LoadOverlayService) {

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.loadOverlayService.raise();

    setTimeout(() => {
      this.loadOverlayService.abate();
      if (this.loginForm.valid) {
        if (true) {
          this.loginService.login();
          this.router.navigate(['/']);
        } else {
          this.errorDialog('E-mail ou senha inválidos', 'Verifique as informações');
        }
      } else {
        this.errorDialog('Dados Inválidos', 'Verifique as informações');
      }
    }, 500)
    
  }

  errorDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message },
    });
  }

  criarConta(): void {

  }

}
