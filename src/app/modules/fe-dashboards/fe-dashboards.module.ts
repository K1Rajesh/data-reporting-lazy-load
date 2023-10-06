import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { LigDashboardComponent } from './components/lig-dashboard/lig-dashboard.component';
import { LigHeaderPipe } from './components/lig-dashboard/lig-header.pipe';
import { LigDashboardFilterComponent } from './components/lig-dashboard-filter/lig-dashboard-filter.component';

import { FEDashBoardsRoutingModule} from './fe-dashboards-routing.module';

//import { SharedFeaturesModule} from './../shared-features/shared-features.module';
import { FeaturesSharedModule } from './../features-shared/features-shared.module'
import { FeDashboardsFeaturesSharedModule } from './../fe-dashboards-features-shared/fe-dashboards-features-shared.module'

import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component'




@NgModule({
  declarations: [
    LigDashboardComponent,
    LigHeaderPipe,
    LigDashboardFilterComponent,
    DashboardContainerComponent
  ],
  imports: [
    CommonModule,
    FEDashBoardsRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FeaturesSharedModule,
    FeDashboardsFeaturesSharedModule
    //SharedFeaturesModule
  ],
  exports:[
    LigDashboardComponent
  ]
})
export class FEDashboardsModule { }
