import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Employee} from './employee.model';
import {EmployeeDataService} from './employee-data.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './employee.component.html',
  providers: [EmployeeDataService]
})
export class EmployeeComponent {
  titles = ['Dev', 'QA', 'TeamLead'];
  employee: Employee = new Employee();
  public employees: Employee[];
  addMode = false;
  name: string;
  constructor(private dataService: EmployeeDataService) {
    this.loadEmployees();
    }

  loadEmployees() {
    this.dataService.getEmployees()
      .subscribe((data: Employee[]) => this.employees = data);
  }

  save() {
    if (this.employee.id == null) {
      this.dataService.createEmployee(this.employee)
        .subscribe((data: HttpResponse<Employee>) => {
          this.employees.push(data.body);
          console.log(data);
        });
    } else {
      this.dataService.updateEmployee(this.employee)
        .subscribe(data => this.loadEmployees());
    }
  }
}

