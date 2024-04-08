import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { GraphqlService } from './services/graphql.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { AddemployeeComponent } from './components/addemployee/addemployee.component';
import {RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    LoginComponent,
    EmployeelistComponent,
    AddemployeeComponent,
    RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = '101383730_comp3133_assig2';
  username: string = '';
  isAuthenticated: boolean = false;
  

  constructor(
    private graphqlService: GraphqlService,
     private cdr: ChangeDetectorRef,
     private router: Router) {
 
  }
  ngOnInit() {

      console.log('Authentication status changed:', this.isAuthenticated);

   
  }

  ngOnDestroy() {
    //this.authSubscription.unsubscribe();
  }

  logout() {

    this.isAuthenticated = false;
    this.username = '';
  }

  login(credentials: { username: string; password: string }) {
    const { username, password } = credentials;
    this.graphqlService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login successful, data received:', response.data);
        this.handleLoginSuccess(username); 
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.isAuthenticated = false;
      },
    });
  }

  handleLoginSuccess(username: string) {
    this.isAuthenticated = true;
    this.username = username;
    this.cdr.detectChanges()
    this.router.navigate(['/']);
    
  }


}
