import {Employee} from '../employee/employee.model';

export class Vacation {
  constructor(
    public id?: number,
    public employeeId?: number,
    public  employee?: Employee,
    public start?: Date,
    public end?: Date
  ) {
  }
}
