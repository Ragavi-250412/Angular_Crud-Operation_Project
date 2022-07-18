import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from '../../services/employee.service';
import { SnackBarConfigService } from '../../services/snackbar-config.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  config: any;
  @Input() employeeDetails: Employee;
  @Input() mode: String;
  title: any;
  buttonText: any;
  constructor(
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private snackBarService: SnackBarConfigService,
    public dialogRef: MatDialogRef<AddEmployeeComponent>
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.config = {
      duration: 2000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    };
    this.title = this.mode === 'add' ? 'Add Employee' : 'Update Employee';
    this.buttonText = this.mode === 'add' ? 'Save' : 'Update';
    if (this.mode === 'edit') {
      this.updateForm();
    }
  }

  //patch the value in edit mode
  updateForm() {
    this.form.setValue({
      firstName: this.employeeDetails.firstName,
      lastName: this.employeeDetails.lastName,
      age: this.employeeDetails.age,
      experience: this.employeeDetails.experience,
      designation: this.employeeDetails.designation,
      salary: this.employeeDetails.salary,
    });
    this.validateAllFormFields(this.form);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control: any = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
  private createForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      experience: ['', Validators.required],
      designation: ['', Validators.required],
      salary: [''],
    });
  }
  submit() {
    // emppty stuff
  }

  // add and update the emp record
  onSubmit() {
    const reqObj = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      age: this.form.controls['age'].value,
      designation: this.form.controls['designation'].value,
      experience: this.form.controls['experience'].value,
      salary: this.form.controls['salary'].value,
    };
    if (this.mode === 'add') {
      this.empService.createEmployee(reqObj).subscribe((response) => {
        if (response) {
          this.snackBar.open(
            'Employee Created Successfully',
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
    } else {
      this.empService
        .updateEmployee(this.employeeDetails.id, reqObj)
        .subscribe((data) => {
          if (data) {
            this.snackBar.open(
              'Employee Updated Successfully',
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
  }

  // close the dialog
  onClose() {
    this.dialogRef.close('close after save');
  }

  // close the dialog
  onNoClick() {
    this.dialogRef.close('closed');
  }

  confirmAdd() {}
}
