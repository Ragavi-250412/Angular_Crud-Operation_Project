import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackBarConfigService } from 'src/app/services/snackbar-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss'],
})
export class DeleteEmployeeComponent implements OnInit {
  @Input() employeeDetails: Employee;
  @Input() mode: String;
  data: any;
  config: any;
  constructor(
    private employeeService: EmployeeService,
    private snackBarService: SnackBarConfigService,
    public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.config = {
      duration: 2000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    };
    this.data = this.employeeDetails;
  }

  //open the dialog to delete the selected emp record
  confirmDelete() {
    this.employeeService
      .deleteEmployee(this.employeeDetails.id)
      .subscribe((response) => {
        if (response) {
          this.snackBar.open(
            'Employee Deleted Successfully',
            undefined,
            this.config
          );
          this.onClose();
        }
      }),
      (error: any) => {
        this.snackBar.open('Communication Error', undefined, this.config);
        this.onClose();
      };
  }

  //close the dialog
  onClose() {
    this.dialogRef.close('close after save');
  }

  // close the dialog
  onNoClick() {
    this.onClose();
  }
}
