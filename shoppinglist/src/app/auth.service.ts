import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {RecursiveTemplateAstVisitor} from "@angular/compiler";
import {throwError} from "rxjs";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7e2xGQ6PvUgLTbA1nO_BSBYU2I1Cfihs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(ErrorRes => {
        let defaulter = 'error occured';
        if (!ErrorRes.error ||!ErrorRes.error.error){
          return throwError(defaulter)
        }
        switch (ErrorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            defaulter = "this error email exist already"
        }
        return throwError(defaulter)
    }))
  }
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7e2xGQ6PvUgLTbA1nO_BSBYU2I1Cfihs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
  }


}
