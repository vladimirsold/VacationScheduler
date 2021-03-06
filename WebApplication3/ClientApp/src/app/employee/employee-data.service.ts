import {Injectable, inject, Inject} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Employee} from './employee.model';

@Injectable()
export class EmployeeDataService {

  private readonly apiUrl: string ;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'api/Employees';
  }

  getEmployees() {
    return this.http.get(this.apiUrl);
  }
  getEmployeesWithNextVacation() {
    return this.http.get(this.apiUrl + '/NextVacation');
  }
  createEmployee(employee: Employee) {
    return this.http.post(this.apiUrl, employee, {observe: 'response'});
  }
  updateEmployee(employee: Employee) {

    return this.http.put(this.apiUrl + '/' + employee.id, employee);
  }
  deleteEmployee(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
