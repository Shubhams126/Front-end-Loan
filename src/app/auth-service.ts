
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string | null;
  role?: string | null;
  requires2FASetup?: boolean;
  challengeId?: string | null;
  qrCode?: string | null;
}

export interface LoginRequest {
  email: string | null;
  password: string | null;
}

export interface Setup2FARequest {
  challengeId:any;
}

export interface VerifyOTPRequest {
  challengeId:any;
  otp:any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:44365/api/Auth';

  Register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/Register`, data
    );
  }

  VerifyRegistrationOtp(data: any){
    return this.http.post<any>(
      `${this.baseUrl}/VerifyRegistrationOtp`, data
    );
  }

  Login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/Login`, data
    );
  }

  Setup2FA(data: Setup2FARequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/Setup2FA`, data
    );
  }

  VerifyOTP(data: VerifyOTPRequest){
    return this.http.post<any>(
      `${this.baseUrl}/VerifyOTP`, data
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  GoogleLogin(): void {
    window.location.href = `${this.baseUrl}/GoogleLogin`;
  }
}
