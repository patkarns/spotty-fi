import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface RetrieveTokenResponse {
  access_token: string;
  token_expiry_utc: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public retrieveToken(): Observable<{
    accessToken: string;
    expiryDate: string;
    isTokenExpired: boolean;
  }> {
    const getAuthTokenUrl = '/auth/token';
    return this.http.get<RetrieveTokenResponse>(getAuthTokenUrl).pipe(
      map((response) => {
        const accessToken = response.access_token;
        const expiryDate = response.token_expiry_utc;
        return {
          accessToken,
          expiryDate,
          isTokenExpired: dayjs().isAfter(expiryDate),
        };
      })
    );
  }

  public logout(): void {
    // TODO
  }
}
