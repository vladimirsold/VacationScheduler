import {Injectable, inject, Inject, Output} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Vacation} from './vacation.model';
import {EventEmitter} from '@angular/core';

@Injectable()
export class VacationDataService {

  private readonly url: string ;
  vacationAdded = new EventEmitter();
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl + 'api/Vacations';
  }

  getVacations() {
    return this.http.get(this.url);
  }
  getTopVacations() {
    return this.http.get(this.url + '/Top');
  }
  createVacation(vacation: Vacation) {
    return this.http.post(this.url, vacation, {observe: 'response'});
  }
  updateVacation(vacation: Vacation) {

    return this.http.put(this.url + '/' + vacation.id, vacation);
  }
  deleteVacation(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
