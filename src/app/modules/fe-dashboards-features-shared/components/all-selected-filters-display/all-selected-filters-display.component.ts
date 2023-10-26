import { Component, OnInit } from '@angular/core';

import { SelectedFiltersDisplayModel } from './../../domain/models/selected-filters-display.model';

import { FilterIModel5 } from '../../../fe-dashboards/models/lig-dashboard-filter.model'


@Component({
  selector: 'app-all-selected-filters-display',
  templateUrl: './all-selected-filters-display.component.html',
  styleUrls: ['./all-selected-filters-display.component.css'],
  providers:[SelectedFiltersDisplayModel]
})
export class AllSelectedFiltersDisplayComponent implements OnInit {
  get selectedFilters():FilterIModel5 {
    return this.model.selectedFilters
  }
  constructor(private model : SelectedFiltersDisplayModel) { }

  ngOnInit() {
    this.model.init();
  }

}
