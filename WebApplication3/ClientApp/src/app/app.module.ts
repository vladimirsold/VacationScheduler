import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import {VacationComponent} from './vacation/vacation.component';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {VacationsListComponent} from './vacations-list/vacations-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    VacationComponent,
    VacationsListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent, pathMatch: 'full'}
    ]),
    NgbDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
