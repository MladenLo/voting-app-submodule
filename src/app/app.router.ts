import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublicPollsComponent } from './public-polls/public-polls.component';
import { PublicPollComponent } from './public-poll/public-poll.component';

const router: Routes = [
    { path: "home", component: WelcomeComponent },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "public/all", component: PublicPollsComponent },
    { path: 'public/all/:id', component: PublicPollComponent },
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);