import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "../user.model";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localid: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  user = new BehaviorSubject<UserModel>(null);
   private storeTimer: any;

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorHandler),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.idToken, resData.localid, +resData.expiresIn,)
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorHandler),
      tap(resData => this.handleAuthentication(resData.email, resData.idToken, resData.localid, +resData.expiresIn)
      ));
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.storeTimer){
      clearTimeout(this.storeTimer)
    }
    this.storeTimer = null;
  }

  autoLogin() {
    const userData: {
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string}
      = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const newUser = new UserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (newUser.token){
      this.user.next(newUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }

  }
  autoLogout(expirationDuration: number){
  setTimeout(() =>{
    console.log(expirationDuration)
    this.storeTimer =  this.logout()
  },expirationDuration)
  }
  private handleAuthentication(
    email: string,
    token: string,
    localid: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(
      email,
      localid,
      token,
      expirationDate
    );

    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

}

export const errorHandler = (ErrorRes: HttpErrorResponse) => {

  let defaulter = 'error occured';
  if (!ErrorRes.error || !ErrorRes.error.error) {
    return throwError(defaulter)
  }
  switch (ErrorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      defaulter = "this error email exist already";
      break;
    case 'EMAIL_NOT_FOUND':
      defaulter = "There is no user record corresponding to this identifier or The user may have been deleted.";
      break;
    case 'INVALID_PASSWORD':
      defaulter = "Invalid password please try again later";
      break;
  }
  return throwError(defaulter)
}
