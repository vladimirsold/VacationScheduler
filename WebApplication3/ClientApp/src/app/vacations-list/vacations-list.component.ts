import { Component, OnInit } from '@angular/core';
import {VacationDataService} from '../vacation/vacation-data.service';
import {Vacation} from '../vacation/vacation.model';
import {EmployeeDataService} from '../employee/employee-data.service';
import {Employee} from '../employee/employee.model';

@Component({
  selector: 'app-vacations-list',
  templateUrl: './vacations-list.component.html',
  styleUrls: ['./vacations-list.component.css'],
  providers: [VacationDataService, EmployeeDataService]
})
export class VacationsListComponent implements OnInit {
  private topVacations: Vacation[]
  private employees: Employee[];
  visible = false;
  constructor(private  vacationDataService: VacationDataService,
              private employeeDataService: EmployeeDataService) {
  }

  ngOnInit() {
    this.vacationDataService.vacationAdded
      .subscribe(() => {
        this.loadTopVacation();
        console.log('reloadVac');
      });
    this.loadTopVacation();
  }
  loadEmployee() {
    this.employeeDataService.getEmployees()
      .subscribe((data: Employee[]) => this.employees = data);
  }
  selectName(id: number) {
    for (let j of this.employees) {
        if (j.id === id) {
          return j.name;
        }
    }
  }

  loadTopVacation() {
    this.vacationDataService.getTopVacations()
      .subscribe((data: Vacation[]) => {
        this.topVacations = data;
        if (this.topVacations != null) {
          this.visible = true;
        }
      });
  }
}
