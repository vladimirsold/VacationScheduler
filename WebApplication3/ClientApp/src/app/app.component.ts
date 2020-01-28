import {Component, ViewChild} from '@angular/core';
import {VacationsListComponent} from './vacations-list/vacations-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild(VacationsListComponent, {static: false}) list: VacationsListComponent;

  updateVacationList() {
    this.list.loadEmployees();
  }
}
