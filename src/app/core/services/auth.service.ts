import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface AccessToken {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  retrieveToken(): Observable<boolean> {
    const getAuthTokenUrl = '/auth/token';
    return (
      this.http.get<AccessToken>(getAuthTokenUrl).pipe(
        map(response => {
        const tokenString = response.access_token;
        localStorage.setItem('token', tokenString);
        this.isAuthenticated = tokenString.length > 0;
        return this.isAuthenticated;
        })
      )
    );    
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
