import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = new BehaviorSubject<boolean>(this.checkToken());

  private checkToken() : boolean {
    return !! localStorage.getItem('token');
  }

  login(token:string) : void {
    localStorage.setItem('token',token);
    this.isLogin.next(true);
  }

  isLoggedIn() : Observable<boolean> {
    return this.isLogin.asObservable();
  }

  logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('NameUser');
    localStorage.removeItem('SurnameUser');
    localStorage.removeItem('Img');
    this.isLogin.next(false);
  }

  setNameUser(user:string) : void {
    localStorage.setItem('NameUser', user);
  }

  getNameUser() : string {
    return localStorage.getItem('NameUser');
  }

  setSurnameUser(user:string) : void {
    localStorage.setItem('SurnameUser', user);
  }

  getSurnameUser() : string {
    return localStorage.getItem('SurnameUser');
  }

  setImg(user:string) : void {
    localStorage.setItem('Img', user);
  }

  getImg(): string{
    return localStorage.getItem('Img');
  }

  constructor() { }
}
