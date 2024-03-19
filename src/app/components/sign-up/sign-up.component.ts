import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {GraphqlService} from '../../services/graphql.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  username: string ="";
  password: string ="";
  email: string ="";

  constructor(private graphqlService: GraphqlService) { }

  onSignUp(): void {
    this.graphqlService.signUp(this.username, this.email, this.password).subscribe({
      next: ({ data }) => {
        console.log('Sign Up Success:', data);
        
      },
      error: (error) => {
        console.error('Sign Up Error:', error);
        
      }
    });
  }

}
