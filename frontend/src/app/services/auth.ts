import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'http://127.0.0.1:8000/api/token/';

  constructor(private http: HttpClient) {}

  // Admin login
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      username: username,
      password: password
    }).pipe(
      tap(response => {
        sessionStorage.setItem('access_token', response.access);
        sessionStorage.setItem('refresh_token', response.refresh);
      })
    );
  }

  // Check whether admin is logged in
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('access_token');
  }

  // Logout
  logout(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }
}