import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {BehaviorSubject} from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from 'src/app/dialogs/add-employee/add-employee.component';
import { Employee } from 'src/app/models/employee';
import { DeleteEmployeeComponent } from 'src/app/dialogs/delete-employee/delete-employee.component';

@Component({
  selector: 'app-employee-table',
  styleUrls: ['employee.component.scss'],
  templateUrl: 'employee.component.html',
})
export class EmployeeComponent {
  employeeDetails: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort ;
  @ViewChild('searchbar') searchbar:ElementRef;
  searchText = '';

  toggleSearch:boolean = false;
  dataSource = new MatTableDataSource();
  columnsToDisplay: String[] = ['firstName', 'lastName', 'age', 'experience', 'designation', 'salary', 'actions'];
  dataSubject = new BehaviorSubject<Element[]>([]);

  constructor(public dialogService: MatDialog, private changeDetectorRef: ChangeDetectorRef,
    private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.getAllEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // get all the employees records
  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(response => {
      if(response.code === '200'){
        this.dataSource = new MatTableDataSource(response.data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  // open the dialog to add the employee record
  openAddDialog(){
    const dialogRef = this.dialogService.open(AddEmployeeComponent);

    dialogRef.componentInstance.mode ='add'
    dialogRef.componentInstance.employeeDetails = new Employee();
    dialogRef.afterClosed().subscribe(result => {
     this.getAllEmployees();
       this.changeDetectorRef.markForCheck();
    });
  }

  // open the dialog to edit the employee record
  startEdit(row: any) {
    const dialogRef = this.dialogService.open(AddEmployeeComponent);

    dialogRef.componentInstance.mode ='edit';
    dialogRef.componentInstance.employeeDetails = row;
    dialogRef.afterClosed().subscribe(result => {
     this.getAllEmployees();
     this.changeDetectorRef.markForCheck();
    });
  }

  // open the dialog to delete the record
  deleteItem(row: any) {
    const dialogRef = this.dialogService.open(DeleteEmployeeComponent);

    dialogRef.componentInstance.mode ='delete';
    dialogRef.componentInstance.employeeDetails = row;
    dialogRef.afterClosed().subscribe(result => {
     this.getAllEmployees();
     this.changeDetectorRef.markForCheck();
    });
  }

  openSearch(){
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose(){
    this.searchText = '';
    this.toggleSearch = false;
  }
}

