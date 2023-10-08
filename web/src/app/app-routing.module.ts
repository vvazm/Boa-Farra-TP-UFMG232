import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FeedComponent } from './feed/feed.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'account', component: MyAccountComponent },
  { path: '', component: FeedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
