import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //get current user
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token

  public genearteToken(loginData: any) {

    return this.http.post(`${baseUrl}/generate-token`, loginData)
  }

  //login user :  set token in local storage

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  //isLogin: user is logged in or not

  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
  
    // If tokenStr is null, undefined, or an empty string, the user is not logged in
    return !(tokenStr === null || tokenStr === undefined || tokenStr === '');
  }
  

  //log out

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userData'); 
    localStorage.clear();
    return true;
  }

  //get token

  public getToken(){
    return localStorage.getItem('token');
  }
  
  // set userDetail

  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }

  //get user

  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  //get use role

  public getUserRole(){
    let user = this.getUser();
    return user?.authorities[0].authority||'DEFAULT_ROLE' ;
    
  }
  // public getUserRole(): string {
  //   // Check if user object exists before accessing authorities
  //   let user = this.getUser();
  //   return this.user?.authorities || 'DEFAULT_ROLE';
  // }
}
