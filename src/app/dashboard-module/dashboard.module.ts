import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { NewPollComponent } from './components/new-poll/new-poll.component';
import { AllPollsComponent } from './components/all-polls/all-polls.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { DashboardRoutingModule } from './dashboard.router';
import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';
import { PollService } from '../services/poll.service';
import { EditPollComponent } from './components/edit-poll/edit-poll.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [
    
  ],
  providers: [
    AuthGuard,
    AuthService,
    PollService
  ],
  declarations: [HomeComponent, NewPollComponent, AllPollsComponent, UserProfileComponent, EditPollComponent]
})
export class DashboardModule { }
