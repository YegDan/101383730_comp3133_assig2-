import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  employee: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    const stateData = history.state.employee;
    if (stateData) {
      this.employee = stateData;
      console.log('Employee data:', this.employee);
    } else {
      
      console.error('No employee data available.');
    }
  }

}
