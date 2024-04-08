import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, tap } from 'rxjs';
import { Observable } from 'rxjs'; // Import the 'Observable' class from the 'rxjs' package
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private apollo:Apollo) {}

  updateAuthenticationStatus(isAuthenticated: boolean): void {
    this.isLoggedInSubject.next(isAuthenticated);
    console.log('Authentication status updated in service:', isAuthenticated);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  

  login(username: string, password: string) {
    return this.apollo.query({
      query: gql`
        query login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            id
            username
            password
          }
        }
      `,
      variables: {
        username,
        password
      }
        }).pipe(
          tap(response => console.log('GraphQL response:', response)),
          catchError(error => {
            console.error('GraphQL error:', error);
            return throwError(error);
          })
        )
  }


  signUp(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation signUp($username: String!, $email: String!, $password: String!) {
          signUp(username: $username, email: $email, password: $password) {
            id
            username
            email
          }
        }
      `,
      variables: {
        username,
        email,
        password
      }
    });
  }

  fetchAllEmployees() {
    return this.apollo.query({
      query: gql`
        query {
          allEmployees {
            id
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `
    });
  }

  getEmployeeById(employeeId: string): Observable<any> {
    return this.apollo.query({
      query: gql`
        query getEmployee($id: ID!) {
          employee(id: $id) {
            id
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
      variables: {
        id: employeeId
      },
      fetchPolicy: 'no-cache' 
    });
  }

  addEmployee(firstName: string, lastName: string, email: string, gender: 'male' | 'female' | 'other', salary: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation addEmployee($firstName: String!, $lastName: String!, $email: String!, $gender: Gender!, $salary: Int!) {
          addEmployee(firstName: $firstName, lastName: $lastName, email: $email, gender: $gender, salary: $salary) {
            id
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
      variables: {
        firstName,
        lastName,
        email,
        gender,
        salary
      }
    });
  }
  

  

  deleteEmployee(employeeId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteEmployee($id: ID!) {
          deleteEmployee(id: $id) {
            firstName
          }
        }
      `,
      variables: {
        id: employeeId
      }
    });
  }

 

  updateEmployee(employeeId: string, firstName?: string, lastName?: string, email?: string, gender?: 'male' | 'female' | 'other', salary?: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateEmployee($id: ID!, $firstName: String, $lastName: String, $email: String, $gender: Gender, $salary: Int) {
          updateEmployee(id: $id, firstName: $firstName, lastName: $lastName, email: $email, gender: $gender, salary: $salary) {
            id
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
      variables: {
        id: employeeId,
        firstName, 
        lastName,
        email,
        gender,
        salary,
      }
    });
  }




  
}
