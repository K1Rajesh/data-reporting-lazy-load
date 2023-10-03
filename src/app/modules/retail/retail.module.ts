import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailRoutingModule } from './retail-routing.module';

import { FeaturesSharedModule } from './../features-shared/features-shared.module';
import { RetailComponent } from './components/retail/retail.component';
import { UfillComponent } from './components/ufill/ufill.component';



@NgModule({
  declarations: [
    RetailComponent,
    UfillComponent
  ],
  imports: [
    CommonModule,
    RetailRoutingModule,
    FeaturesSharedModule
  ]
})
export class RetailModule { }
