import { Component, OnInit,OnChanges, OnDestroy, Input,SimpleChanges } from '@angular/core';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { LigDashboardFilterModel } from '../../domain/models/lig-dashboard-filter.model';

import { FiterControlIModel } from "../../models/lig-dashboard-filter.model";

@Component({
  selector: 'app-lig-dashboard-filter',
  templateUrl: './lig-dashboard-filter.component.html',
  styleUrls: ['./lig-dashboard-filter.component.css'],
  providers: [LigDashboardFilterModel]
})
export class LigDashboardFilterComponent implements OnInit,OnChanges, OnDestroy {

  constructor(private ligDashboardFilterModel : LigDashboardFilterModel) { }

  @Input() 
  get filters():any{
    return this.ligDashboardFilterModel.filtersUniqueValues;
  }
  set filters(val:any){
    this.ligDashboardFilterModel.filtersUniqueValues=val;
  }

  get filterFormControls(): Map<string , FiterControlIModel>{
    return this.ligDashboardFilterModel.filterFormControls
  }
  get isShowFilter():boolean{
    return this.ligDashboardFilterModel.isShowFilter;
  }
  set isShowFilter(val:boolean) {
    this.ligDashboardFilterModel.isShowFilter=val;
  }


  ngOnInit(): void {
    this.ligDashboardFilterModel.init();
  }
  ngOnChanges(changes: SimpleChanges):void{
    if(changes.filters){
      this.ligDashboardFilterModel.setFilterValues();
    }
    
  }
  public formSubmitHandler():void {
    this.ligDashboardFilterModel.formSubmitHandler()
  }
  public optionSelectedHandler(event: MatAutocompleteSelectedEvent, autoCompleteId:any): void {
    this.ligDashboardFilterModel.optionSelectedHandler(event,autoCompleteId)
  }
  public optionRemoveHandler(selctedFilterValue:string,filterKey:string){
    this.ligDashboardFilterModel.optionRemoveHandler(selctedFilterValue,filterKey)
  }
  public asIsOrder(a:any,b:any){
    return 1;
  }
  ngOnDestroy(): void {
  }

}