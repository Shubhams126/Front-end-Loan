
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// LMS dashboard summary.
export interface LMSReportSummary {
  totalLoans: number;
  activeLoans: number;
  closedLoans: number;
}

// LMS dashboard response.
export interface LMSReportsDashboardData {
  summary: LMSReportSummary;
  loanPortfolioChart: LoanPortfolioChartItem[];
  collectionEfficiencyChart: CollectionEfficiencyChartItem[];
}

// Loan portfolio chart item.
export interface LoanPortfolioChartItem {
  product: string;
  outstandingAmount: number;
  percentage: number;
}

// Collection efficiency chart item.
export interface CollectionEfficiencyChartItem {
  month: string;
  collectionPercentage: number;
}

// Loan portfolio report row.
export interface LoanPortfolioItem {
  product: string;
  activeLoans: number;
  outstandingAmount: number;
  percentage: number;
}

// EMI collection report row.
export interface EMICollectionItem {
  particulars: string;
  count: number;
  amount: number;
  percentage: number;
}

// Overdue report row.
export interface OverdueReportItem {
  daysOverdue: string;
  accounts: number;
  outstandingAmount: number;
}

// Disbursement report row.
export interface DisbursementReportItem {
  month: string;
  loansDisbursed: number;
  disbursementAmount: number;
}

// Prepayment report row.
export interface PrepaymentReportItem {
  type: string;
  accounts: number;
  prepaymentAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class LMSReportsService {

  private apiUrl = 'https://localhost:7121/api/LMSReports';

  constructor(private http: HttpClient) {}

  // Fetch the LMS dashboard.
  getLMSReportsDashboard(): Observable<LMSReportsDashboardData> {
    return this.http.get<LMSReportsDashboardData>(
      `${this.apiUrl}/dashboard`
    );
  }

  // Fetch the loan portfolio report.
  getLoanPortfolio(): Observable<LoanPortfolioItem[]> {
    return this.http.get<LoanPortfolioItem[]>(
      `${this.apiUrl}/loan-portfolio`
    );
  }

  // Fetch EMI collection data, optionally filtered by date.
  getEMICollection(
    fromDate?: string,
    toDate?: string
  ): Observable<EMICollectionItem[]> {
    let params = new HttpParams();

    if (fromDate) {
      params = params.set('fromDate', fromDate);
    }

    if (toDate) {
      params = params.set('toDate', toDate);
    }

    return this.http.get<EMICollectionItem[]>(
      `${this.apiUrl}/emi-collection`,
      { params }
    );
  }

  // Fetch overdue data for a particular date.
  getOverdueReport(
    asOnDate?: string
  ): Observable<OverdueReportItem[]> {
    let params = new HttpParams();

    if (asOnDate) {
      params = params.set('asOnDate', asOnDate);
    }

    return this.http.get<OverdueReportItem[]>(
      `${this.apiUrl}/overdue`,
      { params }
    );
  }

  // Fetch disbursement data, optionally filtered by date.
  getDisbursementReport(
    fromDate?: string,
    toDate?: string
  ): Observable<DisbursementReportItem[]> {
    let params = new HttpParams();

    if (fromDate) {
      params = params.set('fromDate', fromDate);
    }

    if (toDate) {
      params = params.set('toDate', toDate);
    }

    return this.http.get<DisbursementReportItem[]>(
      `${this.apiUrl}/disbursement`,
      { params }
    );
  }

  // Fetch prepayment data, optionally filtered by date.
  getPrepaymentReport(
    fromDate?: string,
    toDate?: string
  ): Observable<PrepaymentReportItem[]> {
    let params = new HttpParams();

    if (fromDate) {
      params = params.set('fromDate', fromDate);
    }

    if (toDate) {
      params = params.set('toDate', toDate);
    }

    return this.http.get<PrepaymentReportItem[]>(
      `${this.apiUrl}/prepayment`,
      { params }
    );
  }
}
