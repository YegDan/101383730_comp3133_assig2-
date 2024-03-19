import { Component } from '@angular/core';
import { GraphqlService } from '../../services/graphql.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string ="";
  password: string ="";

  constructor(private graphqlService: GraphqlService, private router: Router) { }

  onLogin(): void {
    // Use the properties bound to the input fields
    this.graphqlService.login(this.username, this.password).subscribe({
      next: ({ data }) => {
        console.log(data);
        // You would typically navigate to another route on success
        // this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

}
