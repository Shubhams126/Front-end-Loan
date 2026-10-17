
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReportSummary {
  totalApplications: number;
  applicationsApproved: number;
  applicationsRejected: number;
  applicationsPending: number;
}

export interface ApplicationFunnelItem {
  stage: string;
  count: number;
}

export interface ReportsDashboardData {
  summary: ReportSummary;
  applicationFunnel: ApplicationFunnelItem[];
  cibilScoreRanges: any[];
  scoreCardWise: any[];
  productWise: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrl = 'https://localhost:7121/api/Reports/dashboard';

  constructor(private http: HttpClient) {}

  getReportsDashboard(): Observable<ReportsDashboardData> {
    return this.http.get<ReportsDashboardData>(this.apiUrl);
  }
}
