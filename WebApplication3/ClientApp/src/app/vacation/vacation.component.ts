import {Component, EventEmitter, Output} from '@angular/core';
import {VacationDataService} from './vacation-data.service';
import {Employee} from '../employee/employee.model';
import {EmployeeDataService} from '../employee/employee-data.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Vacation} from './vacation.model';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {errorObject} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-add-vacations',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css'],
  providers: [VacationDataService, EmployeeDataService]
})
export class VacationComponent {
  @Output() loaded = new EventEmitter();
  vacation: Vacation = new Vacation();
  employees: Employee[];
  name: string;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  alert = false;
  alertType: string;
  alertMessage: string;
  constructor(private employeeDataService: EmployeeDataService,
              private  vacationDataService: VacationDataService,
              private calendar: NgbCalendar,
              public formatter: NgbDateParserFormatter) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeDataService.getEmployees()
      .subscribe((data: Employee[]) => this.employees = data);
  }

  save() {
    this.vacation.start = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day + 1);
    this.vacation.end = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day + 1)
    this.vacationDataService.createVacation(this.vacation)
      .subscribe((data: HttpResponse<Vacation>) => {
        if (data.ok) {
          this.alertType = 'success';
          this.alertMessage = 'Vacation success added';
          this.alert = true;
          setTimeout(() => this.alert = false, 4000);
          this.loaded.emit();
        }
      }, (error: HttpErrorResponse) => {
        console.log(error.error);

        this.alertType = 'danger';
        this.alertMessage = 'Can\'t create vacation in this date range';
        this.alert = true;
        setTimeout(() => this.alert = false, 4000);
      });
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
