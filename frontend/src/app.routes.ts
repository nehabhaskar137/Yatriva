
import { Routes } from '@angular/router';

import { Home } from './app/pages/home/home';
import { DestinationDetails } from './app/pages/destination-details/destination-details';
import { AdminDashboard } from './app/pages/admin-dashboard/admin-dashboard';
import { AdminLogin } from './app/pages/admin-login/admin-login';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'destination/:name',
    component: DestinationDetails
  },

  {
    path: 'admin-login',
    component: AdminLogin
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboard
  },

  // Enquiries page
  {
    path: 'enquiries',
    component: AdminDashboard
  },

  {
    path: '**',
    redirectTo: ''
  }

];
