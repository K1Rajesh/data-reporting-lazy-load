import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FELigDashboardComponent } from './components/fe-lig-dashboard/fe-lig-dashboard.component';
import { LigHeaderPipe } from './components/fe-lig-dashboard/lig-header.pipe';
import { FELigDashboardFilterComponent } from './components/fe-lig-dashboard-filter/fe-lig-dashboard-filter.component';
import { AllAppliedFiltersDisplayComponent } from './components/all-applied-filters-display/all-applied-filters-display.component'

import { FEDashBoardsRoutingModule} from './fe-dashboards-routing.module';

//import { SharedFeaturesModule} from './../shared-features/shared-features.module';
import { FeaturesSharedModule } from './../features-shared/features-shared.module'
import { FeDashboardsFeaturesSharedModule } from './../fe-dashboards-features-shared/fe-dashboards-features-shared.module'

import { FEDashboardContainerComponent } from './components/fe-dashboard-container/fe-dashboard-container.component'




@NgModule({
  declarations: [
    FELigDashboardComponent,
    LigHeaderPipe,
    FELigDashboardFilterComponent,
    FEDashboardContainerComponent,
    AllAppliedFiltersDisplayComponent
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
    FELigDashboardComponent
  ]
})
export class FEDashboardsModule { }
