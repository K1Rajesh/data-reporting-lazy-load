import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSelectedFiltersDisplayComponent } from './components/all-selected-filters-display/all-selected-filters-display.component';



@NgModule({
  declarations: [
    AllSelectedFiltersDisplayComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AllSelectedFiltersDisplayComponent
  ]
})
export class FeDashboardsFeaturesSharedModule { }
