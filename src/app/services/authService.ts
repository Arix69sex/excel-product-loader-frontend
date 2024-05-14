import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  apiUrl: String = "http://localhost:3000/api/users";
  private tokenKey = 'token';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers }).pipe(
        map((response) => {
            const token = response.jwt;
            this.saveToken(token); 
            return response;
          }),
        catchError(error => {
        console.error(error)
        throw 'Error in login API call';
      })
    );
  }

  signup(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/signup`, body, { headers }).pipe(
        map((response) => {
            const token = response.body.jwt;
            this.saveToken(token); 
            return response;
          }),
        catchError(error => {
        console.error(error)
        throw 'Error in signup API call';
      })
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
 }

 getToken(): string | null {
    return localStorage.getItem(this.tokenKey); 
  }

 logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

}