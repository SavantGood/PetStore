import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PetService} from './services/pet.service';
import {StoreService} from './services/store.service';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import { RegisterComponent } from './register/register.component';
import {LoginService} from './services/login.service';
import { LogoutComponent } from './logout/logout.component';
import {LogoutService} from './services/logout.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'logout', component: LogoutComponent}
    ])
  ],
  providers: [PetService, StoreService, LoginService, LogoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
