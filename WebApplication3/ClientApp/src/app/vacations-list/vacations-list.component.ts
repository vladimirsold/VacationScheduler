import { Component, OnInit } from '@angular/core';
import {VacationDataService} from '../vacation/vacation-data.service';
import {Vacation} from '../vacation/vacation.model';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-vacations-list',
  templateUrl: './vacations-list.component.html',
  styleUrls: ['./vacations-list.component.css'],
  providers: [VacationDataService]
})
export class VacationsListComponent implements OnInit {
  private topVacations: Vacation[]
  visible = false;
  constructor(private  vacationDataService: VacationDataService) {
  }

  ngOnInit() {
    this.vacationDataService.vacationAdded
      .subscribe(() => {
        this.loadTopVacation();
        console.log('reloadVac');
      });
    this.loadTopVacation();
  }
  format(data) {
    return new Date(data);
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
