import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './modals/dialog/dialog.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FeedComponent } from './feed/feed.component';
import { LoadingSpinnerComponent } from './utils/loading-spinner/loading-spinner.component';
import { LoadingSpinnerService } from './utils/loading-spinner/loading-spinner.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GalleryComponent } from './utils/gallery/gallery.component';
import { FeedService } from './feed/feed.service';
import { CreateAccountService } from './create-account/create-account.service';
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './login/auth.intercptor';
import { LoadingSpinnerInterceptor } from './utils/loading-spinner/loading-spinner.intercptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogComponent,
    CreateAccountComponent,
    FeedComponent,
    LoadingSpinnerComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatListModule,
    HttpClientModule  
  ],
  providers: [
    LoginService,
    LoadingSpinnerService,
    FeedService,
    CreateAccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingSpinnerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
