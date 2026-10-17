import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoanAccounts } from './loan-accounts/loan-accounts';
import { EmiSchedules } from './emi-schedules/emi-schedules';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoanAccounts, EmiSchedules],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  openMenus: { [key: string]: boolean } = {
    customer: true,
    loans: false,
    payments: false
  };

  notificationCount = 0;

  toggleMenu(menu: string) {
    this.openMenus[menu] = !this.openMenus[menu];
  }

  logout() {
    // Redirect to the login page
    window.location.href = '/login';
  }
}