
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import {
  DashboardService,
  DashboardData
} from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  dashboardData: DashboardData | null = null;

  errorMessage = '';
  isLoading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  // Fetch dashboard data from the existing .NET API.
  loadDashboard(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Dashboard API error:', error);

        this.errorMessage =
          'Unable to load dashboard data. Please check the backend connection.';

        this.isLoading = false;
      }
    });
  }

  // Format the loan amount in Indian currency style.
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
}
