import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Employee} from './employee.model';
import {EmployeeDataService} from './employee-data.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './employee.component.html',
  providers: [EmployeeDataService]
})
export class EmployeeComponent {
  @Output() loaded = new EventEmitter();
  visible = false;
  titles = ['Dev', 'QA', 'TeamLead'];
  employee: Employee = new Employee();

  constructor(private dataService: EmployeeDataService) {
  }

  save() {
    if (this.employee.id == null) {
      this.dataService.createEmployee(this.employee)
        .subscribe((data: HttpResponse<Employee>) => {
          console.log(data);
          if (data.ok) {
            this.loaded.emit();
          }
        });
    }
  }

  toggle() {
    this.visible = !this.visible;
  }
}

