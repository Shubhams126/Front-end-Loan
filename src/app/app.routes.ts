
import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { CustomerDashboard } from './customer-dashboard/customer-dashboard';
import { OfficerDashboard } from './officer-dashboard/officer-dashboard';
import { OfficerKyc } from './officer-kyc/officer-kyc';
import { CustomerKyc } from './customer-kyc/customer-kyc';
import { EmiPayment } from './emi-payment/emi-payment';
import { ForeClosure } from './fore-closure/fore-closure';
import { ForeClosureRequest } from './fore-closure-request/fore-closure-request';
import { Foreclosuredetails } from './foreclosuredetails/foreclosuredetails';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Auth },

  { path: 'officer/dashboard', component: OfficerDashboard },
  { path: 'customer/dashboard', component: CustomerDashboard },

    { path: 'officer-dashboard', redirectTo: 'officer/dashboard' },
  { path: 'customer-dashboard', redirectTo: 'customer/dashboard' },
   
   {path :'emi', component : EmiPayment},
   {path :'foreclosure', component : ForeClosure},
  {path :'foreclorequest', component : ForeClosureRequest},

  { path: 'foreclosure-details/:id', component: Foreclosuredetails},

  { path: '**', redirectTo: 'login' }, 
  {
  path: 'customer/kyc',
  component: CustomerKyc
},
 {
  path: 'officer/kyc',
  component: OfficerKyc
}
];
