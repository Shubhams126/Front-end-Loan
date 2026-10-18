
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from '../auth-service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  service = inject(AuthService);
  router = inject(Router);

  mode = 'login';
  message = '';
  challengeId:any ;
  qrCode:any ;
  loading = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(21),
    email: new FormControl(''),
    password: new FormControl(''),
    mobileNo: new FormControl(''),
    pan: new FormControl(''),
    aadhaarNo: new FormControl(''),
    employmentType: new FormControl(''),
    monthlyIncome: new FormControl(0),
    totalMonthlyDebt: new FormControl(0),
  });

  otpForm = new FormGroup({
    otp: new FormControl(''),
  });

  showRegister(): void {
    this.mode = 'register';
    this.message = '';
  }

  showLogin(): void {
    this.mode = 'login';
    this.message = '';
    this.challengeId = '';
    this.qrCode = '';
    this.otpForm.reset();
  }

  signInWithGoogle(): void {
    this.message = '';
    this.service.GoogleLogin();
  }

  register(): void {
    this.loading = true;
    this.message = '';

    this.service.Register(this.registerForm.getRawValue()).subscribe({
      next: (res: AuthResponse) => {
        this.loading = false;

        if (res.success) {
          this.mode = 'registerOtp';
          this.otpForm.reset();
          this.message = res.message || 'OTP sent to your email.';
        } else {
          this.message = res.message || 'Registration failed.';
        }
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Registration error:', err);
        this.message =
          err.error?.message || 'Unable to connect to the server.';
      },
    });
  }

  verifyRegistrationOtp(): void {
    this.loading = true;
    this.message = '';

    this.service.VerifyRegistrationOtp({
      email: this.registerForm.controls.email.value,
      otp: this.otpForm.controls.otp.value?.trim() || '',
    }).subscribe({
      next: (res: AuthResponse) => {
        this.loading = false;

        if (res.success) {
          this.loginForm.patchValue({
            email: this.registerForm.controls.email.value,
          });

          this.mode = 'login';
          this.otpForm.reset();
          this.message = 'Registration successful. Please log in.';
        } else {
          this.message = res.message || 'Invalid OTP.';
        }
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Registration OTP error:', err);
        this.message =
          err.error?.message || 'OTP verification failed.';
      },
    });
  }

  // LOGIN: generate and retain the latest challenge ID
  login(): void {
    if (this.loading) return;

    this.loading = true;
    this.message = '';
    this.challengeId = '';
    this.qrCode = '';
    this.otpForm.reset();

    this.service.Login(this.loginForm.getRawValue()).subscribe({
      next: (res: AuthResponse) => {
        console.log('Login API response:', res);
        
        if (!res.success) {
          this.loading = false;
          this.message = res.message || 'Login failed.';
          return;
        }

        // Challenge ID must come from the backend Login response.
        const newChallengeId = res.challengeId?.trim();

        if (!newChallengeId) {
          this.loading = false;
          this.message =
            'Login API returned an empty Challenge ID. Check the backend Login response.';
          return;
        }

        this.challengeId = newChallengeId;

        if (res.requires2FASetup) {
          this.service.Setup2FA({
            challengeId: this.challengeId,
          }).subscribe({
            next: (setupRes: AuthResponse) => {
              this.loading = false;
              console.log('Setup2FA response:', setupRes);

              if (!setupRes.success) {
                this.message =
                  setupRes.message || '2FA setup failed.';
                return;
              }

              // Retain the same challenge if Setup2FA omits it.
              this.challengeId =
                setupRes.challengeId?.trim() || this.challengeId;

              this.qrCode = setupRes.qrCode || '';
              this.mode = 'loginOtp';
              this.message = this.qrCode
                ? 'Scan the QR code and enter your authenticator code.'
                : 'Enter your authenticator code.';
            },
            error: (err: any) => {
              this.loading = false;
              console.error('Setup2FA error:', err);
              this.message =
                err.error?.message || '2FA setup failed.';
            },
          });
        } else {
          // Existing 2FA users should not need to scan the QR again.
          this.loading = false;
          this.mode = 'loginOtp';
          this.message = 'Enter your authenticator code.';
        }
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Login error:', err);
        this.message = err.error?.message || 'Login failed.';
      },
    });
  }

  // VERIFY AUTHENTICATOR OTP
  verifyLoginOtp(): void {
    if (this.loading) return;

    this.message = '';

    const otp = this.otpForm.controls.otp.value?.trim() || '';
    const challenge = this.challengeId;

    if (!challenge) {
      this.message = 'Challenge ID is missing. Please log in again.';
      this.mode = 'login';
      return;
    }

    if (!otp) {
      this.message = 'Please enter the authenticator code.';
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      this.message = 'Enter a valid 6-digit authenticator code.';
      return;
    }

    this.loading = true;

    const request = {
      challengeId: challenge,
      otp: otp,
    };

    console.log('VerifyOTP request:', {
      challengeId: request.challengeId,
      otp: '[hidden]',
    });

    this.service.VerifyOTP(request).subscribe({
      next: (res: AuthResponse) => {
        this.loading = false;
        console.log('VerifyOTP response:', res);

        if (!res.success || !res.token) {
          this.message =
            res.message || 'OTP verification failed.';
          return;
        }

        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role || '');

        // The OTP has succeeded; the challenge is no longer needed.
        this.challengeId
        this.qrCode 

        const role = (res.role || '').toLowerCase().trim();

        if (role === 'customer') {
          this.router.navigate(['/customer/dashboard']);
        } else if (
          role === 'loanofficer' ||
          role === 'loan officer'
        ) {
          this.router.navigate(['/officer/dashboard']);
        } else {
          this.message = 'Login succeeded, but the user role is unknown.';
        }
      },
      error: (err: any) => {
        this.loading = false;
        console.error('VerifyOTP error:', err);
        this.message =
          err.error?.message || 'OTP verification failed.';
      },
    });
  }
}