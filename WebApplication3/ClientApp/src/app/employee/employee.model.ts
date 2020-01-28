import {Vacation} from '../vacation/vacation.model';

export  class Employee {
  constructor(
    public id?: number,
    public name?: string,
    public title?: string,
    public nextVacation?: Vacation
  ) {
  }
}
