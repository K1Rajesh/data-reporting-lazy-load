import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedUserRoutingModule } from './authorized-user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FeatureCardComponent } from './components/home/feature-card/feature-card.component';
import { TopNavHomeComponent } from './components/top-nav/top-nav-home.component';



@NgModule({
  declarations: [
    HomeComponent,
    FeatureCardComponent,
    TopNavHomeComponent
  ],
  imports: [
    CommonModule,
    AuthorizedUserRoutingModule
  ]
})
export class AuthorizedUserModule { }
