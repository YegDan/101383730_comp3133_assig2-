import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphqlService } from '../../services/graphql.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-updateemployee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateemployee.component.html',
  styleUrl: './updateemployee.component.css'
})
export class UpdateemployeeComponent implements OnInit {

  employee: any 

  constructor(
    private graphqlService: GraphqlService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {

    const stateData = history.state.employee;
    if (stateData) {
      this.employee = stateData;
      console.log('Employee data from state:', this.employee);
    } else {

      console.error('No employee data available.');
      this.router.navigate(['/']);  
    }
  }

  onSubmit(): void {

    if (this.employee) {
      this.graphqlService.updateEmployee(
        this.employee.id,
        this.employee.firstName,
        this.employee.lastName,
        this.employee.email,
        this.employee.gender as 'female' | 'male' | 'other',
        this.employee.salary
      ).subscribe({
        next: (response) => {
          console.log('Employee updated:', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error updating employee:', error);
        }
      });
    } else {
      console.error('No employee data to update.');
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
  

}
