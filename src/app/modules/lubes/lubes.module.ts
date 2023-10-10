import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LubesComponent } from './components/lubes/lubes.component';
import { LigComponent } from './components/lig/lig.component';
import { LigCsvDownloadComponent } from './components/lig/lig-csv-download/lig-csv-download.component';

import { LubesRoutingModule } from './lubes-routing.module'

import { FeaturesSharedModule } from './../features-shared/features-shared.module';
import { FEDashboardsModule } from '../fe-dashboards/fe-dashboards.module';
import { LigContainerComponent } from './components/lig-container/lig-container.component';


@NgModule({
  declarations: [
    LubesComponent,
    LigComponent,
    LigCsvDownloadComponent,
    LigContainerComponent
  ],
  imports: [
    CommonModule,
    LubesRoutingModule,
    FeaturesSharedModule,
    FEDashboardsModule
  ],
  exports:[
    LubesComponent,
    LigComponent
  ]
})
export class LubesModule { }
