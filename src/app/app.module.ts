import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRowDefDirective } from './directives/mat-row-def.directive';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { LogoutComponent } from './logout/logout.component';
import { AddEmployeeComponent } from './dialogs/add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './dialogs/delete-employee/delete-employee.component';
import { SharedModule } from './modules/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatRowDefDirective,
    UnauthorizedComponent,
    LogoutComponent,
    AddEmployeeComponent,
    DeleteEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [SharedModule, RouterModule],
  entryComponents: [
    AddEmployeeComponent,
    DeleteEmployeeComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
