import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscDashboardsRoutingModule } from './misc-dashboards-routing.module'

import { IndexingReportComponent } from './indexing-report/indexing-report.component'
import { FeaturesSharedModule } from '../features-shared/features-shared.module';



@NgModule({
  declarations: [IndexingReportComponent],
  imports: [
    CommonModule,
    MiscDashboardsRoutingModule,
    FeaturesSharedModule
  ],
  exports:[
    IndexingReportComponent
  ]
})
export class MiscDashboardsModule { }
