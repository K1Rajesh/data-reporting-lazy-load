import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { FELigDashboardFilterModel } from '../../domain/models/fe-lig-dashboard-filter.model';

import { FiterControlIModel } from "../../models/lig-dashboard-filter.model";

@Component({
  selector: 'app-fe-lig-dashboard-filter',
  templateUrl: './fe-lig-dashboard-filter.component.html',
  styleUrls: ['./fe-lig-dashboard-filter.component.css'],
  providers: [FELigDashboardFilterModel]
})
export class FELigDashboardFilterComponent implements OnInit, OnDestroy {

  @Input() 
  get dynamicLoader():string | undefined{
    return this.ligDashboardFilterModel.dynamicLoader;
  }
  set dynamicLoader(val:string | undefined){
    this.ligDashboardFilterModel.dynamicLoader=val;
  }

  constructor(private ligDashboardFilterModel : FELigDashboardFilterModel) { }

  get filters():any{
    return this.ligDashboardFilterModel.filtersUniqueValues;
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

  get isKibanaLayout(){
    return this.ligDashboardFilterModel.isKibanaLayout
  }


  ngOnInit(): void {
    this.ligDashboardFilterModel.init();
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
  public applyFilterClickHandler(){
    this.ligDashboardFilterModel.applyFilterClickHandler()
  }
  public asIsOrder(a:any,b:any){
    return 1;
  }
  ngOnDestroy(): void {
    this.ligDashboardFilterModel.destroy();
  }

}
