import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo:Apollo) {}

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
    });
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
}
