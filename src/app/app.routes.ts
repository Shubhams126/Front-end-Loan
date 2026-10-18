
import { Routes } from '@angular/router';

import { Auth } from './auth/auth';
import { CustomerDashboard } from './customer-dashboard/customer-dashboard';
import { OfficerDashboard } from './officer-dashboard/officer-dashboard';

import { Cibil } from './cibil/cibil';
import { CustomerList } from './customer-list/customer-list';
import { ScoreCard } from './scorecard/scorecard';
import { EligibilityResult } from './eligibilityresult/eligibilityresult';
import { ManualReview } from './manualreview/manualreview';

import { OfficerKyc } from './officer-kyc/officer-kyc';
import { CustomerKyc } from './customer-kyc/customer-kyc';

import { EmiPayment } from './emi-payment/emi-payment';
import { ForeClosure } from './fore-closure/fore-closure';
import { ForeClosureRequest } from './fore-closure-request/fore-closure-request';
import { Foreclosuredetails } from './foreclosuredetails/foreclosuredetails';
import { EmiSchedules } from './emi-schedules/emi-schedules';
import { LoanAccounts } from './loan-accounts/loan-accounts';

import { ApplyLoanComponent } from './pages/apply-loan/apply-loan';
import { LoanDealComponent } from './pages/loan-deal/loan-deal';
import { SanctionComponent } from './pages/sanction/sanction';
import { DisbursementComponent } from './pages/disbursement/disbursement';
import { Dashboard } from './pages/dashboard/dashboard';
import { Reports } from './pages/reports/reports';
import { SupportTickets } from './pages/support-tickets/support-tickets';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Auth },

 // Customer sidebar routes
{ path: 'customer/profile', component: CustomerDashboard },
{ path: 'customer/cibil-score', component: Cibil },
{ path: 'customer/eligibility-result', component: EligibilityResult },
{ path: 'customer/track-status', component: CustomerDashboard },
{ path: 'customer/emi-schedule', component: EmiSchedules },
{ path: 'customer/make-payments', component: EmiPayment },
{ path: 'customer/payment-history', component: EmiPayment },
{ path: 'customer/my-penalties', component: CustomerDashboard },
{ path: 'customer/support', component: SupportTickets },
{ path: 'customer/foreclosure', component: ForeClosure },

{ path: 'customer/dashboard', component: CustomerDashboard },
{ path: 'officer/dashboard', component: OfficerDashboard },
// Officer sidebar routes
{ path: 'officer/customers', component: CustomerList },
{ path: 'officer/eligibility-check', component: EligibilityResult },
{ path: 'officer/score-cards', component: ScoreCard },
{ path: 'officer/loan-applications', component: ApplyLoanComponent },
{ path: 'officer/closure-requests', component: ForeClosureRequest },
{ path: 'officer/penalty-charges', component: ForeClosureRequest },
{ path: 'officer/support-tickets', component: SupportTickets },

  // Unknown URLs
  { path: '**', redirectTo: 'login' }
];
