import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PetService} from './services/pet.service';
import {StoreService} from './services/store.service';
import {LoginComponent} from './pages/login/login.component';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {LoginService} from './services/login.service';
import {LogoutComponent} from './pages/logout/logout.component';
import {LogoutService} from './services/logout.service';
import {AppState} from './app.state';
import {RegisterService} from './services/register.service';
import {PetComponent} from './pages/pet/pet.component';
import {OrderComponent} from './pages/order/order.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatTooltipModule
} from '@angular/material';
import {InputComponent} from './components/input/input.component';
import {MyNavComponent} from './components/my-nav/my-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {AppConfig} from './app.config';
import { SelectComponent } from './components/select/select.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {AuthGuard} from './auth.guard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SnackBarService} from './services/snack-bar.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {PetFormComponent} from './pages/pet/forms/pet-form/pet-form.component';
import { OrderFormComponent } from './pages/order/forms/order-form/order-form.component';

export function initFactory(config: AppConfig): () => Promise<boolean> {
  return () => new Promise((resolve) => {
    config.load().subscribe(() => {
      resolve(true);
    });
  });
}

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
    SpinnerComponent,
    PetFormComponent,
    OrderFormComponent,
  ],
  entryComponents: [
    PetFormComponent,
    OrderFormComponent
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    AppConfig,
    PetService,
    StoreService,
    LoginService,
    LogoutService,
    AppState,
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
