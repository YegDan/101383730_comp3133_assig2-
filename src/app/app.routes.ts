import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AppComponent } from './app.component';

import { AddemployeeComponent } from './components/addemployee/addemployee.component';
import { UpdateemployeeComponent } from './components/updateemployee/updateemployee.component';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { DetailsComponent } from './components/details/details.component';



export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeelistComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'add-employee', component: AddemployeeComponent },
  { path: 'edit-employee/:id', component: UpdateemployeeComponent },
  {path:'details/:id', component: DetailsComponent}

  // { path: 'login', component: LoginComponent },
  // { path: 'sign-up', component: SignUpComponent },
  // {path: 'add-employee', component: AddemployeeComponent},
  // {path: 'edit-employee/:id', component: UpdateemployeeComponent},
  
];
