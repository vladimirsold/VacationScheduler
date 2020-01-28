import { Component, OnInit } from '@angular/core';
import {VacationDataService} from '../vacation/vacation-data.service';
import {Vacation} from '../vacation/vacation.model';
import {formatDate} from '@angular/common';
import {EmployeeDataService} from '../employee/employee-data.service';
import {Employee} from '../employee/employee.model';

@Component({
  selector: 'app-vacations-list',
  templateUrl: './vacations-list.component.html',
  styleUrls: ['./vacations-list.component.css'],
  providers: [EmployeeDataService]
})
export class VacationsListComponent implements OnInit {
  private employees: Employee[];
  visible = false;
  constructor(private  employeeDataService: EmployeeDataService) {
  }

  ngOnInit() {
    this.loadEmployees();
  }
  format(data) {
    return new Date(data);
  }
  loadEmployees() {
    this.employeeDataService.getEmployeesWithNextVacation()
      .subscribe((data: Employee[]) => {
        this.employees = data;
        if (this.employees.length > 0) {
          this.visible = true;
        }
      });
  }
}
