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
import { LoadOverlayService } from './utils/load-overlay-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GalleryComponent } from './utils/gallery/gallery.component';
import { FeedService } from './feed/feed.service';
import { CreateAccountService } from './create-account/create-account.service';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    FeedComponent,
    LoadingSpinnerComponent,
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
    MatListModule  
  ],
  providers: [
    LoginService,
    LoadOverlayService,
    FeedService,
    CreateAccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
