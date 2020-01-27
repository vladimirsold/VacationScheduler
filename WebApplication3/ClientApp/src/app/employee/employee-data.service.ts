import {Injectable, inject, Inject} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Employee} from './employee.model';

@Injectable()
export class EmployeeDataService {

  private readonly url: string ;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl + 'api/Employees';
  }

  getEmployees() {
    return this.http.get(this.url);
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.url, employee, {observe: 'response'});
  }
  updateEmployee(employee: Employee) {

    return this.http.put(this.url + '/' + employee.id, employee);
  }
  deleteEmployee(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
