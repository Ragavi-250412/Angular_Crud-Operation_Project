import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    EmployeeComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    // MatSnackBarModule,
    // MatTableModule,
    // MatSortModule,
    // MatIconModule,
    // MatPaginatorModule,
    // MatDialogModule
  ],
  exports : [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class EmployeeModule { }
