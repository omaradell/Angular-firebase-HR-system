import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFireModule } from '@angular/fire';
import { RegisterComponent } from './register/register.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DepartmentsComponent } from './departments/departments.component';
import { DepDetailsComponent } from './dep-details/dep-details.component';
import { OfficesComponent } from './offices/offices.component';
import { OffDetailsComponent } from './off-details/off-details.component';
import { JobTitlesComponent } from './job-titles/job-titles.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SafePipe } from './safe.pipe';
import { EmpAttendanceComponent } from './emp-attendance/emp-attendance.component'
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { AuthComponent } from './auth/auth.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    DepartmentsComponent,
    DepDetailsComponent,
    OfficesComponent,
    OffDetailsComponent,
    JobTitlesComponent,
    JobDetailsComponent,
    EmployeesComponent,
    EmpDetailsComponent,
    HomeComponent,
    ProfileComponent,
    SafePipe,
    EmpAttendanceComponent,
    TopbarComponent,
    AttendanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AuthModule,
    Ng2SearchPipeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
