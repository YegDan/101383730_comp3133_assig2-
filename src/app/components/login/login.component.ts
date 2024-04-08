import { Component, output, EventEmitter, Output } from '@angular/core';
import { GraphqlService } from '../../services/graphql.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //@Output() login = new EventEmitter<{ username: string, password: string }>();
  @Output() loginSuccess = new EventEmitter<void>();
  username: string = '';
  password: string = '';

  constructor(
    private graphqlService: GraphqlService,
    private router: Router) { }

  onLogin(): void {
    this.graphqlService.login(this.username, this.password).subscribe({
      next: ({ data }: { data: any }) => {
        console.log(data);
        //this.login.emit({ username: this.username, password: this.password });
        this.loginSuccess.emit();
        this.router.navigate(['/']);

      },
      error: (error: any) => {
        console.error('Login failed:', error);
      }
    });
  }
}



