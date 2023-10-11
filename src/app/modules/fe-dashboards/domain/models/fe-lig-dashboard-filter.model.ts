import { Injectable } from "@angular/core";
import {FormControl} from '@angular/forms';

import { Observable , Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

//import { FELigDashboardModel} from './fe-lig-dashboard.model'
import { LigDashboardModel3} from './lig-dashboard3.model'

import { LigDataFilterIModel } from "../../models/api/lig-data-request.model";
import { FiterControlIModel } from "../../models/lig-dashboard-filter.model";

import { LigFormFilterControlService} from '../../services/lig-form-filter-controls.service'

import { CONST_VALUES } from "../../../../core/constant-reources";

@Injectable()
export class FELigDashboardFilterModel {

    private subsList : Array<Subscription> = new Array<Subscription>();

    public filtersUniqueValues : any;
    public filtersAvailable : Array<string> = [
      'FinancialYear',
      'month',
      'sap_cc_number',
      'user_persona',
      'SALES_GROUP_NAME' ,
      'SALES_OFFICE_NAME',
      'taluka',
      'district',
      'state',
      'PRODUCT_CODE',
      'PRODUCT_NAME',
      'PRODUCT_BRAND',
    ]
    public filterFormControls : Map<string , FiterControlIModel> = new Map<string , FiterControlIModel>();
    private filtersApplied : LigDataFilterIModel;

    public isShowFilter: boolean = false;
    public dynamicLoader:string | undefined = undefined;
    public KIBANA_DASHBOARD = CONST_VALUES.DYNAMIC_LOADER_ID.KIBANA_DASHBOARD
    public isKibanaLayout:boolean = false;
  
    constructor(
      //private FELigDashboardModel : FELigDashboardModel,
      private ligDashBoardModel3 : LigDashboardModel3,
       private ligFormFilterControlService:LigFormFilterControlService) {
    }
    init(){
      this.setInitialAppliedFilterValues();
      this.subscribeFilterValues()
      this.initFilterFormControls();
      this.setIsKibanaLayout();
      if(this.isKibanaLayout){
        this.initateGetLigDataApiCall(this.filtersApplied!,false);
      }
    }
    public setIsKibanaLayout(){
      this.isKibanaLayout = this.dynamicLoader === this.KIBANA_DASHBOARD
    }
    public subscribeFilterValues():void{
      this.subsList.push(
        this.ligFormFilterControlService.filters$.subscribe((filters)=>{
          this.filtersUniqueValues = filters;
          this.setFilterValues();
        })
      );
    }
    public initFilterFormControls(): void {
      this.filtersAvailable.forEach(filter=>{
        this.filterFormControls.set( filter, 
           {
            filterControl :  new FormControl(''),
            filterOptionsAll : [],
            filterOptionsCurrent$ : new Observable<string[]>(),
            filtersSelected : [],
          }
        )
      })
    }
    public setFilterValues():void{

      this.filtersAvailable.forEach((filter)=>{
        const tempfilterFormControl = this.filterFormControls.get(filter);
        if(tempfilterFormControl){
          tempfilterFormControl.filterOptionsAll = this.filtersUniqueValues[filter]
          this.filterFormControls.set(filter , tempfilterFormControl);
        }
      })
      //overrideDefaultFilterValues
      this.setFixedFilterControlValues();

      this.subscribeFilterControlValueChanges();
    }
    public setInitialAppliedFilterValues(){
      this.filtersApplied = {month:["2023-08"],FinancialYear:["2023-2024"]}
    }
    public setFixedFilterControlValues():void{
      const tempfilterFormControlYear = this.filterFormControls.get('FinancialYear');
      if(tempfilterFormControlYear){
        tempfilterFormControlYear.filtersSelected = ["2023-2024"]
        tempfilterFormControlYear.filterControl.disable({ onlySelf: true, emitEvent: false})
        this.filterFormControls.set('FinancialYear' , tempfilterFormControlYear);
      }
      const tempfilterFormControlMonth = this.filterFormControls.get('month');
      if(tempfilterFormControlMonth){
        tempfilterFormControlMonth.filtersSelected = ["2023-08"]
        tempfilterFormControlMonth.filterControl.disable({ onlySelf: true, emitEvent: false})
        this.filterFormControls.set('month' , tempfilterFormControlMonth);
      }
    }
    public subscribeFilterControlValueChanges():void{

      this.filtersAvailable.forEach((filter)=>{
        const tempfilterFormControl = this.filterFormControls.get(filter);

        if(tempfilterFormControl){
          tempfilterFormControl.filterOptionsCurrent$ = tempfilterFormControl.filterControl?.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(tempfilterFormControl.filterOptionsAll , tempfilterFormControl.filtersSelected , value || '')),
          )
        }

      })

    }
    private _filter( filterData:Array<string> , filtersSelected:Array<string> ,filterValue: string): string[] {
      const filterValueLower = filterValue.toLowerCase();
      if(!filterData){
        return [];
      }
      else{
        if(!filterValue){
          return filterData.filter(option=>!filtersSelected.includes(option));
        }
        return filterData.filter(option => 
          {
            return option.toLowerCase().startsWith(filterValueLower) && !filtersSelected.includes(option);
          });
      }
      
    }
    public optionSelectedHandler(event: MatAutocompleteSelectedEvent, autoCompleteId:string):void {

      //Add update filter value
      this.addNewFilter(autoCompleteId , event.option.value)
    }
    public optionRemoveHandler(filterValue:string,filterKey:string,):void{
      this.removeNewFilter(filterKey,filterValue)
    }
    public addNewFilter(filterId:string,filterValue:string):void{
      //this.filtersApplied[filterId] = filterValue

      //
      const tempFilterControl = this.filterFormControls.get(filterId)
      if(tempFilterControl && tempFilterControl.filtersSelected ){
        tempFilterControl.filterControl.reset();
        tempFilterControl.filtersSelected = [...tempFilterControl.filtersSelected,filterValue]
        this.filterFormControls.set(filterId , tempFilterControl)
      }
      //
      this.mapFilterControlsToFilter();
      //
      this.initateGetLigDataApiCall(this.filtersApplied!,false);
      //
      if(this.filtersApplied){
        this.ligFormFilterControlService.emitSelectedFilters(this.filtersApplied)
      }
      
    }
    public removeNewFilter(filterKey:string,filterValue:string): void{
      // if(this.filtersApplied[filterId]){
      //   delete this.filtersApplied[filterId];
      // }

      const tempFilterControl = this.filterFormControls.get(filterKey)
      if(tempFilterControl && tempFilterControl.filtersSelected && tempFilterControl.filtersSelected .length >0){
        const removedFilter = tempFilterControl.filtersSelected.filter((filterSelectedEle)=>
          filterSelectedEle !== filterValue
        )
        tempFilterControl.filtersSelected = removedFilter
        this.filterFormControls.set(filterKey , tempFilterControl)
      }
      
      this.mapFilterControlsToFilter();
      this.initateGetLigDataApiCall(this.filtersApplied!,false);
    }
    public mapFilterControlsToFilter(){
      this.filterFormControls.forEach((value,key) => {
        this.filtersApplied![key]=value.filtersSelected;
      });
    }
    public formSubmitHandler():void{


    }
    public destroy():void{
      this.subsList.forEach((sub)=>sub.unsubscribe())
    }
    public initateGetLigDataApiCall(filterObj: LigDataFilterIModel,provideData:boolean ){
      this.ligDashBoardModel3.initateGetLigDataCall(filterObj,provideData)
    }
}