import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';


export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean // ? means this property is optional
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  // user = new Subject<User>();
  user = new BehaviorSubject<User>(null); // act like Subject
  token = null
  tokenExpirationTimer = null

  constructor(private http: HttpClient, private router: Router) { }


  signup(email: string, password: string) {
    const signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4qzQUMCYqyHcKhck0iOQydOgcXMtV404'
    return this.http.post<AuthResponseData>(
      signupUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError))
  }

  login(email: string, password: string) {
    const signinUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4qzQUMCYqyHcKhck0iOQydOgcXMtV404'
    return this.http.post<AuthResponseData>(
      signinUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(
        resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        }
      )
    )
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unkown error occured!'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXIST':
        errorMsg = 'This email exist already'
        break
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email does not exist.'
        break
      case 'INVALID_PASSWORD':
        errorMsg = 'Wrong Password'
        break
    }
    return throwError(errorMsg)
  }

  private handleAuthentication(email: string, userId: string, token: string, expireIn: number) {
    const expirationDate = new Date(new Date().getTime() + expireIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    this.user.next(user)
    this.autoLogout(expireIn * 1000)
    // persist user data
    localStorage.setItem('userData', JSON.stringify(user))
  }

  autoLogin() {
    const userData: {
      email: string
      id: string
      _token: string
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))

    if (!userData) {
      return null;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
    if (loadedUser.token) {// this would call the get token() in user
      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration: number) {
    setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }
}


