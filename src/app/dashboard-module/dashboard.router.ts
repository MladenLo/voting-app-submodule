import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NewPollComponent } from './components/new-poll/new-poll.component';
import { AllPollsComponent } from './components/all-polls/all-polls.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuard } from '../services/auth-guard.service';

const router: Routes = [
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: "polls/all", component: AllPollsComponent },
          { path: "polls/new", component: NewPollComponent },
          { path: "profile", component: UserProfileComponent },
        ],
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(router)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }