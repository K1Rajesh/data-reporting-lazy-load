import { Component, OnInit  } from '@angular/core';

import { SelectedFiltersDisplayModel } from './../../domain/models/selected-filters-display.model';

import { ConcatedFiltersIModel } from '../../../fe-dashboards/models/lig-dashboard-filter.model'


@Component({
  selector: 'app-all-selected-filters-display',
  templateUrl: './all-selected-filters-display.component.html',
  styleUrls: ['./all-selected-filters-display.component.css'],
  providers:[SelectedFiltersDisplayModel]
})
export class AllSelectedFiltersDisplayComponent implements OnInit {
 
  get selectedFilters():ConcatedFiltersIModel {
    return this.model.selectedFilters
  }
  constructor(private model : SelectedFiltersDisplayModel) { }
  public euiBadgeClickHandler(filterKey:string):void{
    this.model.euiBadgeClickHandler(filterKey)
  }

  ngOnInit() {
    this.model.init();
  }

}
