import { signupUserRequest } from './../../models/interface/user/signupUserRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { authRequest } from 'src/app/models/interface/user/auth/authRequest';
import { authResponse } from 'src/app/models/interface/user/auth/authResponse';
import { signupUserResponse } from 'src/app/models/interface/user/signupUserResponse';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = enviroment.API_URL


  constructor(private http: HttpClient, private cookies: CookieService) { };
  signupUser(requestDatas:signupUserRequest):Observable<signupUserResponse> {
    return this.http.post<signupUserResponse>(
      `${this.API_URL}/user`,
      requestDatas
    )
  }

  authUser(requestDatas: authRequest):Observable<authResponse> {
    return this.http.post<authResponse>(
      `${this.API_URL}/auth`,
      requestDatas
    )
  }

  isLoggedIn(): Boolean {
    //Verificar se o usuário possui um Token ou Cookie
    const JWT_TOKEN = this.cookies.get('USER_INFO');
    return JWT_TOKEN ? true: false;
  }

}
