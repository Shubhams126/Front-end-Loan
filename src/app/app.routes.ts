
import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { CustomerDashboard } from './customer-dashboard/customer-dashboard';
import { OfficerDashboard } from './officer-dashboard/officer-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Auth },

  { path: 'officer/dashboard', component: OfficerDashboard },
  { path: 'customer/dashboard', component: CustomerDashboard },

    { path: 'officer-dashboard', redirectTo: 'officer/dashboard' },
  { path: 'customer-dashboard', redirectTo: 'customer/dashboard' },

  { path: '**', redirectTo: 'login' }
];
