import { Injectable } from "@angular/core";
import {FormControl} from '@angular/forms';

import { Observable , Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { LigDashboardModel2} from './lig-dashboard2.model'

import { LigDataFilterIModel } from "../../models/api/lig-data-request.model";
import { FiterControlIModel } from "../../models/lig-dashboard-filter.model";

import { LigFormFilterControlService} from '../../services/lig-form-filter-controls.service'



@Injectable()
export class FELigDashboardFilterModel {

    private subsList : Array<Subscription> = new Array<Subscription>();

    public filtersUniqueValues : any;

    public filtersAvailable : Array<string> = [
      // 'month',
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

    /* ------------------------ filter related propertires start --------------------- */

    public filterFormControls : Map<string , FiterControlIModel> = new Map<string , FiterControlIModel>();

    /* ------------------------ filter related propertires start --------------------- */

    private filtersApplied : LigDataFilterIModel;
    public isShowFilter: boolean = false;
  
    constructor(private ligDashBoardModel2 : LigDashboardModel2,
       private ligFormFilterControlService:LigFormFilterControlService) {
      this.filtersApplied = { "month": "2023-08"}
    }
    init(){
      //this.subscribeLigData();
      //this.subscribeFilterControlValueChanges();
      this.subscribeFilterValues()
      this.initFilterFormControls();
    }
    public subscribeFilterValues():void{
      this.ligFormFilterControlService.filters$.subscribe((filters)=>{
        this.filtersUniqueValues = filters;
        this.setFilterValues();
      });
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

      this.subscribeFilterControlValueChanges();
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
      this.initateGetLigDataApiCall(this.filtersApplied);
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
      this.initateGetLigDataApiCall(this.filtersApplied);
    }
    public mapFilterControlsToFilter(){
      this.filterFormControls.forEach((value,key) => {
        this.filtersApplied[key]=value.filtersSelected;
      });
    }
    public formSubmitHandler():void{


    }
    public destroy():void{
      this.subsList.forEach((sub)=>sub.unsubscribe())
    }
    public initateGetLigDataApiCall(filterObj: LigDataFilterIModel ){
      this.ligDashBoardModel2.initateGetLigDataCall(filterObj)
    }
}