import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GraphqlService } from '../../services/graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employeelist',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent implements OnInit{
  employees : any[] =[]
  isLoggedIn = false;

  constructor(private graphqlService: GraphqlService,
    private router: Router) {}



  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.graphqlService.fetchAllEmployees().subscribe({
      next: (result: any) => {
        this.employees = result?.data?.allEmployees;
      },
      error: (error) => {
        console.error('There was an error fetching the employees', error);
      }
    });
  }

  onEditEmployee(employee: any): void {
    console.log('Edit employee:', employee);
    this.router.navigate([`/edit-employee/${employee.id}`], {
      state: {employee: employee}
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  goToAddEmployee() {
    this.router.navigate(['/add-employee']);
    this.loadEmployees();
  }

  onDeleteEmployee(employeeId: string): void {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.graphqlService.deleteEmployee(employeeId).subscribe({
      next: (response) => {
        console.log('Employee deleted', response);
        
        this.loadEmployees();
      },
      error: (error) => {
        console.error('Error deleting employee', error);
      }
    });
    
  }

  viewEmployeeDetails(employee: any): void {
    this.router.navigate([`/details/${employee.id}`],  {
      state: {employee: {...employee}}
    });
  }


}
