import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {GraphqlService} from '../../services/graphql.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  username: string ="";
  password: string ="";
  email: string ="";

  constructor(private graphqlService: GraphqlService,
    private router: Router) { }

  onSignUp(): void {
    this.graphqlService.signUp(this.username, this.email, this.password).subscribe({
      next: (result: any) => {
        console.log('Sign Up Success:', result.data.signUp);

        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Sign Up Error:', error);
      }
    });
  }

}
