import { Injectable } from "@angular/core";
import {FormControl} from '@angular/forms';

import { Observable , Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { LigDataModel } from "./lig-data.model";

import { FilterIModel, LigDataResponseIModel } from './../../models/api/lig-data-reponse.model';
import { FiterControlIModel } from "../../models/lig-dashboard-filter.model";
import { FilterIModel3 } from "../../models/lig-dashboard-filter.model"

import { LigFormFilterControlService } from '../../services/lig-form-filter-controls.service'
import { LigFormFilterControlService3} from '../../services/lig-form-filter-controls-3.service'


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

    public isShowFilter: boolean = true;
    public dynamicLoader:string | undefined = undefined;
    public KIBANA_DASHBOARD = CONST_VALUES.DYNAMIC_LOADER_ID.KIBANA_DASHBOARD
    public isKibanaLayout:boolean = false;
    //public ligDataServiceLigData$ : Observable<LigDataResponseIModel | undefined>;

    // get ligDataServiceLigData$(){
    //   return this.ligDataModel.ligFilterResponse$
    // } 
  
    constructor(
      //private ligFormFilterControlService:LigFormFilterControlService,
      private ligFormFilterControlService3:LigFormFilterControlService3,
      private ligDataModel : LigDataModel) {
      
      this.initFilterFormControls();
    }
    public initFilterFormControls(): void {
      this.filtersAvailable.forEach(filterKey=>{
        this.filterFormControls.set( filterKey, 
           {
            filterControl :  new FormControl(''),
            filterOptionsAll : [],
            filterOptionsCurrent$ : new Observable<string[]>(),
            filtersOptionsSelected : []
          }
        )
      })
    }

    init(){
      //this.ligDataServiceLigData$ = this.ligDataModel.ligFilterResponse$
      this.subscribeGetLigDataCall();
      this.subscribeSelectedFilters();
      this.setInitialAppliedFilterValues();
      this.setIsKibanaLayout();

    }
    private subscribeGetLigDataCall(){
      this.subsList.push(
          this.ligDataModel.getLigFilterResponse()
          .subscribe(
            (ligData : LigDataResponseIModel | undefined) =>{
              if(ligData && ligData.success && !ligData.provideData && ligData.filters){
                 // When Lig Data API call, update the Filter values in Form control
                  this.setFormControlFilterValues(ligData.filters)

              }
            }, 
            (err:any) =>{console.log("getLigData API Error: ",err)},

          )
        )    
    }
    private subscribeSelectedFilters():void{
      this.filtersAvailable.forEach(filter=>{
        this.ligFormFilterControlService3?.selectedFilters[filter]?.latest?.subscribe((filterList)=>{
          this.setFiltersOptionsSelected(this.filterFormControls,filter,filterList);
          if(filterList){
            this.initateGetLigDataApiCall(false);
          }

        })
        this.ligFormFilterControlService3?.selectedFilters[filter]?.removedValue?.subscribe((filterValue)=>{
          this.updateFiltersOptionsSelected(this.filterFormControls,"remove",filter,filterValue);
        })
        this.ligFormFilterControlService3?.selectedFilters[filter]?.addedValue?.subscribe((filterValue)=>{
          this.updateFiltersOptionsSelected(this.filterFormControls,"add",filter,filterValue);
        })
      })
    }
    private setFiltersOptionsSelected(filterFormControls : Map<string , FiterControlIModel>,key:any,list:Array<string>|undefined){
      const tempFilterFormControl = filterFormControls.get(key);
      if(tempFilterFormControl){
        tempFilterFormControl.filtersOptionsSelected = list
        filterFormControls.set(key,tempFilterFormControl);
      }

    }
    private updateFiltersOptionsSelected(filterFormControls : Map<string , FiterControlIModel>, operation:string,key:any,value:string|undefined){
      const tempFilterFormControl = filterFormControls.get(key);
      if(tempFilterFormControl){
        if(operation === "add" && value){
          tempFilterFormControl.filtersOptionsSelected?.push(value)
        }
        else if(operation === "remove" && value){
          const removeIndexValue = tempFilterFormControl.filtersOptionsSelected?.indexOf(value)
          if(removeIndexValue){
            tempFilterFormControl.filtersOptionsSelected?.splice(removeIndexValue,1)
            if(tempFilterFormControl.filtersOptionsSelected?.length === 0){
              tempFilterFormControl.filtersOptionsSelected = undefined
            }
          }
        }
        filterFormControls.set(key,tempFilterFormControl);
      }
    }
    public setIsKibanaLayout(){
      this.isKibanaLayout = this.dynamicLoader === this.KIBANA_DASHBOARD
    }
    public setFormControlFilterValues(filtersAvailable:FilterIModel):void{

      this.filtersAvailable.forEach((filter)=>{
        if(
          //the filterkey exists on form and it does not have any values selected, then update the from controls all options 
          this.filterFormControls.get(filter) &&
          (
            !this.filterFormControls.get(filter)?.filtersOptionsSelected ||
            this.filterFormControls.get(filter)?.filtersOptionsSelected?.length === 0
          )
        ){
          const tempfilterFormControl = this.filterFormControls.get(filter);
          if(tempfilterFormControl){
            tempfilterFormControl.filterOptionsAll = filtersAvailable[filter];
            this.filterFormControls.set(filter , tempfilterFormControl);
          }
        }
      })
      this.subscribeFilterControlValueChanges();
    }
    public setInitialAppliedFilterValues(){

      this.ligFormFilterControlService3.setSelectedFilter("month",["2023-08"])
      this.ligFormFilterControlService3.setSelectedFilter("FinancialYear",["2023-2024"])

      // initial call api and get data with these intial filters
      this.ligDataModel.initLigFilterCall(false);
    }

    public subscribeFilterControlValueChanges():void{

      this.filtersAvailable.forEach((filter)=>{
        const tempfilterFormControl = this.filterFormControls.get(filter);
        if(tempfilterFormControl){
          tempfilterFormControl.filterOptionsCurrent$ = tempfilterFormControl.filterControl?.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(tempfilterFormControl.filterOptionsAll , tempfilterFormControl.filtersOptionsSelected , value || '')),
          )
        }

      })

    }
    private _filter( filterData:Array<string> , filtersOptionsSelected:Array<string> | undefined ,filterValue: string): string[] {
      const filterValueLower = filterValue.toLowerCase();
      if(!filterData){
        return [];
      }
      else{
        if(!filterValue){
          return filterData.filter(option=> !filtersOptionsSelected?.includes(option));
        }
        return filterData.filter(option => 
          {
            return option.toLowerCase().startsWith(filterValueLower) && !filtersOptionsSelected?.includes(option);
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
      //
      const tempFilterControl = this.filterFormControls.get(filterId)
      if(tempFilterControl){
        tempFilterControl.filterControl.reset();
        const tempFilterControlSelectedValues =tempFilterControl?.filtersOptionsSelected ? tempFilterControl.filtersOptionsSelected : []
        this.ligFormFilterControlService3.setSelectedFilter(filterId,[...tempFilterControlSelectedValues,  filterValue])
      }

          
    }
    public removeNewFilter(filterKey:string,filterValue:string): void{
      const tempSelectedFilterValues = this.filterFormControls.get(filterKey)?.filtersOptionsSelected
      if(tempSelectedFilterValues){
        this.ligFormFilterControlService3.setSelectedFilter(filterKey,(()=>{
          return tempSelectedFilterValues.filter((ele)=>ele !==filterValue)
        })())
      }

    }

    public formSubmitHandler():void{


    }
    public applyFilterClickHandler(){
      this.ligDataModel.initLigDataCall(true)
  
    }
    public destroy():void{
      this.subsList.forEach((sub)=>sub.unsubscribe())
    }
    public initateGetLigDataApiCall(provideData:boolean ){
      this.ligDataModel.initLigFilterCall(provideData)
    }
}