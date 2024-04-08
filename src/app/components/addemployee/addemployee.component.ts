import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../services/graphql.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css'
})
export class AddemployeeComponent{

  employee = {
    firstName: '',
    lastName: '',
    email: '',
    gender: 'female',
    salary: 0
  };


  constructor(private graphqlService: GraphqlService,
    private route: ActivatedRoute,
    private router: Router) {}




  onSubmit(): void {

 
  
    console.log('Submitting employee:', this.employee);

    this.graphqlService.addEmployee(
      this.employee.firstName,
      this.employee.lastName,
      this.employee.email,
      this.employee.gender as 'female' | 'male' | 'other',
      this.employee.salary
    ).subscribe({
      next: (response) => {
        console.log('Employee added:', response);
    

      },
      error: (error) => {
        console.error('Error adding employee:', error);
        
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/']);
  }

}
