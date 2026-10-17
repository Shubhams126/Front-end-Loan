
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ReportsService,
  ReportsDashboardData
} from '../../services/reports';

import {
  LMSReportsService,
  LMSReportsDashboardData,
  LoanPortfolioItem,
  EMICollectionItem,
  OverdueReportItem,
  DisbursementReportItem,
  PrepaymentReportItem
} from '../../services/lms-reports';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports implements OnInit {

  // LOS Reports data.
  reportsData: ReportsDashboardData | null = null;

  // LMS Dashboard data.
  lmsReportsData: LMSReportsDashboardData | null = null;

  // Loan Portfolio report data.
  loanPortfolioData: LoanPortfolioItem[] = [];

  // EMI Collection report data.
  emiCollectionData: EMICollectionItem[] = [];

  // Overdue report data.
  overdueData: OverdueReportItem[] = [];

  // Disbursement report data.
  disbursementData: DisbursementReportItem[] = [];

  // Prepayment report data.
  prepaymentData: PrepaymentReportItem[] = [];

  // LOS dashboard loading and error state.
  errorMessage = '';
  isLoading = true;

  // Loan Portfolio loading and error state.
  isLoanPortfolioLoading = true;
  loanPortfolioError = '';

  // EMI Collection loading and error state.
  isEMILoading = true;
  emiError = '';

  // Overdue loading and error state.
  isOverdueLoading = true;
  overdueError = '';

  // Disbursement loading and error state.
  isDisbursementLoading = true;
  disbursementError = '';

  // Prepayment loading and error state.
  isPrepaymentLoading = true;
  prepaymentError = '';

  // Shared date filters for EMI, Disbursement and Prepayment.
  fromDate = '';
  toDate = '';

  // Separate date filter for Overdue.
  asOnDate = '';

  constructor(
    private reportsService: ReportsService,
    private lmsReportsService: LMSReportsService
  ) {}

  ngOnInit(): void {

    // Fetch LOS Reports dashboard.
    this.reportsService.getReportsDashboard().subscribe({
      next: (data) => {
        this.reportsData = data;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Reports API error:', error);
        this.errorMessage = 'Unable to load LOS reports data.';
        this.isLoading = false;
      }
    });

    // Fetch LMS Dashboard.
    this.lmsReportsService.getLMSReportsDashboard().subscribe({
      next: (data) => {
        this.lmsReportsData = data;
      },
      error: (error: unknown) => {
        console.error('LMS Dashboard API error:', error);
      }
    });

    // Load all LMS reports.
    this.loadLoanPortfolio();
    this.loadEMICollection();
    this.loadOverdueReport();
    this.loadDisbursementReport();
    this.loadPrepaymentReport();
  }

  // Fetch Loan Portfolio.
  loadLoanPortfolio(): void {
    this.isLoanPortfolioLoading = true;
    this.loanPortfolioError = '';

    this.lmsReportsService.getLoanPortfolio().subscribe({
      next: (data) => {
        this.loanPortfolioData = data;
        this.isLoanPortfolioLoading = false;
      },
      error: (error: unknown) => {
        console.error('Loan Portfolio API error:', error);
        this.loanPortfolioError =
          'Unable to load the loan portfolio report.';
        this.isLoanPortfolioLoading = false;
      }
    });
  }

  // Fetch EMI Collection using the selected date range.
  loadEMICollection(): void {
    this.isEMILoading = true;
    this.emiError = '';

    this.lmsReportsService.getEMICollection(
      this.fromDate || undefined,
      this.toDate || undefined
    ).subscribe({
      next: (data) => {
        this.emiCollectionData = data;
        this.isEMILoading = false;
      },
      error: (error: unknown) => {
        console.error('EMI Collection API error:', error);
        this.emiError =
          'Unable to load the EMI collection report.';
        this.isEMILoading = false;
      }
    });
  }

  // Fetch Overdue using the selected as-on date.
  loadOverdueReport(): void {
    this.isOverdueLoading = true;
    this.overdueError = '';

    this.lmsReportsService.getOverdueReport(
      this.asOnDate || undefined
    ).subscribe({
      next: (data) => {
        this.overdueData = data;
        this.isOverdueLoading = false;
      },
      error: (error: unknown) => {
        console.error('Overdue API error:', error);
        this.overdueError =
          'Unable to load the overdue report.';
        this.isOverdueLoading = false;
      }
    });
  }

  // Fetch Disbursement using the selected date range.
  loadDisbursementReport(): void {
    this.isDisbursementLoading = true;
    this.disbursementError = '';

    this.lmsReportsService.getDisbursementReport(
      this.fromDate || undefined,
      this.toDate || undefined
    ).subscribe({
      next: (data) => {
        this.disbursementData = data;
        this.isDisbursementLoading = false;
      },
      error: (error: unknown) => {
        console.error('Disbursement API error:', error);
        this.disbursementError =
          'Unable to load the disbursement report.';
        this.isDisbursementLoading = false;
      }
    });
  }

  // Fetch Prepayment using the selected date range.
  loadPrepaymentReport(): void {
    this.isPrepaymentLoading = true;
    this.prepaymentError = '';

    this.lmsReportsService.getPrepaymentReport(
      this.fromDate || undefined,
      this.toDate || undefined
    ).subscribe({
      next: (data) => {
        this.prepaymentData = data;
        this.isPrepaymentLoading = false;
      },
      error: (error: unknown) => {
        console.error('Prepayment API error:', error);
        this.prepaymentError =
          'Unable to load the prepayment report.';
        this.isPrepaymentLoading = false;
      }
    });
  }

  // Apply the date range to EMI, Disbursement and Prepayment.
  applyDateFilters(): void {

    // Validate the selected date range.
    if (this.fromDate && this.toDate &&
        this.fromDate > this.toDate) {
      this.emiError =
        'From date cannot be later than To date.';
      this.disbursementError =
        'From date cannot be later than To date.';
      this.prepaymentError =
        'From date cannot be later than To date.';
      return;
    }

    this.loadEMICollection();
    this.loadDisbursementReport();
    this.loadPrepaymentReport();
  }

  // Clear the shared date filters and reload those reports.
  clearDateFilters(): void {
    this.fromDate = '';
    this.toDate = '';

    this.loadEMICollection();
    this.loadDisbursementReport();
    this.loadPrepaymentReport();
  }

  // Apply the Overdue as-on date.
  applyOverdueDate(): void {
    this.loadOverdueReport();
  }

  // Clear the Overdue date and use the backend's default date.
  clearOverdueDate(): void {
    this.asOnDate = '';
    this.loadOverdueReport();
  }
}
