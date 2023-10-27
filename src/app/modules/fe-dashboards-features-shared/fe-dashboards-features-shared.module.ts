import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllSelectedFiltersDisplayComponent } from './components/all-selected-filters-display/all-selected-filters-display.component';
import { LigCsvDownloadComponent2} from './components/lig-csv-download-2/lig-csv-download-2.component'

import { FeaturesSharedModule } from './../features-shared/features-shared.module'


@NgModule({
  declarations: [
    AllSelectedFiltersDisplayComponent,
    LigCsvDownloadComponent2
  ],
  imports: [
    CommonModule,
    FeaturesSharedModule
  ],
  exports:[
    AllSelectedFiltersDisplayComponent,
    LigCsvDownloadComponent2
  ]
})
export class FeDashboardsFeaturesSharedModule { }
