import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './register/register.component';
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
import { NavbarComponent } from './navbar/navbar.component';
import { EmpAttendanceComponent } from './emp-attendance/emp-attendance.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AttendanceComponent } from './attendance/attendance.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule) },

	{ path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path:'login' , component:LoginComponent},
  { path:'register' , component:RegisterComponent},
  { path:'departments' , component:DepartmentsComponent},
  { path:'dep-details/:id',component:DepDetailsComponent},
  { path:'offices',component:OfficesComponent},
  { path:'off-details/:id',component:OffDetailsComponent},
  { path:'job-titles',component:JobTitlesComponent},
  { path:'job-details/:id',component:JobDetailsComponent},
  { path:'employees',component:EmployeesComponent},
  { path:'emp-details/:id',component:EmpDetailsComponent},
  { path:'home',component:HomeComponent},
  { path:'profile',component:ProfileComponent},
  { path:'profile',component:ProfileComponent},
  { path:'navbar',component:NavbarComponent},
  { path:'topbar',component:TopbarComponent},
  { path:'emp-attendance',component:EmpAttendanceComponent},
  { path:'attendance',component:AttendanceComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
