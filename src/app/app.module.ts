import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routes } from './app.router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { PublicPollsComponent } from './public-polls/public-polls.component';
import { PublicPollComponent } from './public-poll/public-poll.component';

import { DashboardModule } from './dashboard-module/dashboard.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignupComponent,
    PublicPollsComponent,
    PublicPollComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    DashboardModule,
    routes,
    ChartsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
