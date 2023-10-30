import { Component, OnInit  } from '@angular/core';

import { AllAppliedFiltersDisplayModel } from './../../domain/models/all-applied-filters-display.model';

import { ConcatedFiltersIModel } from '../../../fe-dashboards/models/lig-dashboard-filter.model'


@Component({
  selector: 'app-all-applied-filters-display',
  templateUrl: './all-applied-filters-display.component.html',
  styleUrls: ['./all-applied-filters-display.component.css'],
  providers:[AllAppliedFiltersDisplayModel]
})
export class AllAppliedFiltersDisplayComponent implements OnInit {
 
  get appliedFilters():ConcatedFiltersIModel {
    return this.model.appliedFilters
  }
  constructor(private model : AllAppliedFiltersDisplayModel) { }
  public euiBadgeClickHandler(filterKey:string):void{
    this.model.euiBadgeClickHandler(filterKey)
  }

  ngOnInit() {
    this.model.init();
  }

}
