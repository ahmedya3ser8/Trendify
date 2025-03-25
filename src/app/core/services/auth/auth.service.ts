import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private httpClient: HttpClient, private router: Router) {
    afterNextRender(() => {
      this.isLoggedInUser();
    })
  }
  signUp(data: any): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, data);
  }
  signIn(data: any): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, data);
  }
  saveUserData():void {
    if (localStorage.getItem('user-token')) {
      this.userData.next(jwtDecode(localStorage.getItem('user-token')!));
    }
  }
  isLoggedInUser(): boolean {
    if (localStorage.getItem('user-token')) {
      this.userData.next(jwtDecode(localStorage.getItem('user-token')!));
      return true;
    } else {
      return false;
    }
  }
  logout():void {
    localStorage.removeItem('user-token');
    this.userData.next(null);
    // call api to remove token
    this.router.navigateByUrl('/auth/login');
  }
  verifyEmail(data: any): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, data);
  }
  verifyCode(data: any): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, data);
  }
  resetPassword(data: any): Observable<any> {
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, data);
  }
}
