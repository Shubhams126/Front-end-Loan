
import { Routes } from '@angular/router';
import { Cibil } from './cibil/cibil';
import { CustomerList } from './customer-list/customer-list';
import { ScoreCard } from './scorecard/scorecard';
import { EligibilityResult } from './eligibilityresult/eligibilityresult';
import { ManualReview } from './manualreview/manualreview';



import { Auth } from './auth/auth';
import { CustomerDashboard } from './customer-dashboard/customer-dashboard';
import { OfficerDashboard } from './officer-dashboard/officer-dashboard';
import { OfficerKyc } from './officer-kyc/officer-kyc';
import { CustomerKyc } from './customer-kyc/customer-kyc';
import { EmiPayment } from './emi-payment/emi-payment';
import { ForeClosure } from './fore-closure/fore-closure';

import { ApplyLoanComponent } from './pages/apply-loan/apply-loan';
import { LoanDealComponent } from './pages/loan-deal/loan-deal';
import { SanctionComponent } from './pages/sanction/sanction';
import { DisbursementComponent } from './pages/disbursement/disbursement';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Auth },

  { path: 'officer/dashboard', component: OfficerDashboard },
  { path: 'customer/dashboard', component: CustomerDashboard },

  { path: 'officer-dashboard', redirectTo: 'officer/dashboard' },
  { path: 'customer-dashboard', redirectTo: 'customer/dashboard' },

  { path: 'customer/kyc', component: CustomerKyc },
  { path: 'officer/kyc', component: OfficerKyc },
     
    {path:'cibil',component:Cibil},
    {path:'customers',component:CustomerList},
    {path:'scorecard/:id',component:ScoreCard},
    {path:'eligibility',component:EligibilityResult},
    {path:'manual-review',component:ManualReview}
  { path: 'emi', component: EmiPayment },
  { path: 'foreclosure', component: ForeClosure },

  { path: 'apply-loan', component: ApplyLoanComponent },
  { path: 'loan-deal', component: LoanDealComponent },
  { path: 'sanction', component: SanctionComponent },
  { path: 'disbursement', component: DisbursementComponent },

  { path: '**', redirectTo: 'login' }

];
