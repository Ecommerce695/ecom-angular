import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

// url ='http://50.18.24.167/api/login/';
  constructor(private http:HttpClient) { }
  register(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/register/`, user )
    .pipe(
    )
}
 
  }


