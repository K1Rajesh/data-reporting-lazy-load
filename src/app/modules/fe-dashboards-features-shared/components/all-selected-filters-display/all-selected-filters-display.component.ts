import { Component, OnInit } from '@angular/core';

import { SelectedFiltersDisplayModel } from './../../domain/models/selected-filters-display.model';

import { LigDataFilterIModel } from  "../../../fe-dashboards/models/api/lig-data-request.model";


@Component({
  selector: 'app-all-selected-filters-display',
  templateUrl: './all-selected-filters-display.component.html',
  styleUrls: ['./all-selected-filters-display.component.css'],
  providers:[SelectedFiltersDisplayModel]
})
export class AllSelectedFiltersDisplayComponent implements OnInit {
  get selectedFilters():LigDataFilterIModel {
    return this.model.selectedFilters
  }
  constructor(private model : SelectedFiltersDisplayModel) { }

  ngOnInit() {
    this.model.init();
  }

}
