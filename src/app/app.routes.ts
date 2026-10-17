
import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Reports } from './pages/reports/reports';
import { SupportTickets } from './pages/support-tickets/support-tickets';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'reports',
    component: Reports
  },
  {
    path: 'support-tickets',
    component: SupportTickets
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
