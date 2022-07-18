import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get(`${environment.apiUrl}`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${environment.apiUrl}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${id}`, {responseType: 'text'});
  }
  updateEmployee(id: number, employee: any): Observable<Object> {
    return this.http.put(`${environment.apiUrl}/ ${id}` , employee);
  }
}
