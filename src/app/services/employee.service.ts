import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  // Create (Add) Employee
  addEmployee(data: any): Observable<any> {
    return this._http.post("http://localhost:3000/employees", data) 
      
  }

  updateEmployee(data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${data.id}`, data)
  }

  // Read (Get) Employee List
  getEmployeeList(): Observable<any[]> {
    return this._http.get<any[]>("http://localhost:3000/employees") // Use the correct endpoint
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error Handling
  private handleError(error: any) {
    console.error('API Error: ', error);
    return throwError(error);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`)
  }
}
