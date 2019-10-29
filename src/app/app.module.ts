import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PetService} from './services/pet.service';
import {StoreService} from './services/store.service';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginService} from './services/login.service';
import {LogoutComponent} from './logout/logout.component';
import {LogoutService} from './services/logout.service';
import {ConfigService} from './services/config.service';
import {RegisterService} from './services/register.service';
import {PetComponent} from './pet/pet.component';
import {OrderComponent} from './order/order.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatMenuModule, MatSliderModule} from '@angular/material';
import {InputComponent} from './input/input.component';
import {MyNavComponent} from './my-nav/my-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {AppConfig} from './app.config';
import { SelectComponent } from './select/select.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {AuthGuard} from './auth.guard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SnackBarService} from './services/snack-bar.service';

export function initFactory(config: AppConfig): () => Promise<boolean> {
  return () => new Promise((resolve) => {
    config.load().subscribe(() => {
      resolve(true);
    });
  });
}


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    PetComponent,
    OrderComponent,
    InputComponent,
    MyNavComponent,
    SelectComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'orders', component: OrderComponent, canActivate: [AuthGuard]},
      {path: 'pets', component: PetComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]),
    BrowserAnimationsModule,
    MatMenuModule,
    MatFormFieldModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [
    AppConfig,
    PetService,
    StoreService,
    LoginService,
    LogoutService,
    ConfigService,
    RegisterService,
    AuthGuard,
    SnackBarService,
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [AppConfig],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
