import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private httpClient: HttpClient, private router:Router) { }
  signUp(data: any): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, data);
  }
  signIn(data: any): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, data);
  }
  getUserData():void {
    this.userData.next(jwtDecode(JSON.stringify(localStorage.getItem('user-token'))));
  }
  logout():void {
    localStorage.removeItem('user-token');
    this.userData.next(null);
    // call api to remove token
    this.router.navigateByUrl('/auth/login');
  }
}
