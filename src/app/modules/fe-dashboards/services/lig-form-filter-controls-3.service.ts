import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from 'rxjs';

import { FilterIModel3 } from './../models/lig-dashboard-filter.model';


@Injectable()
export class LigFormFilterControlService3{
    public selectedFilters : FilterIModel3;

    constructor(){
        this.initSelectedFilters();
    }
    init(){

    }
    public initSelectedFilters():void{
        this.selectedFilters = {
            month:this.getInitSelectedFilterEle(),
            FinancialYear: this.getInitSelectedFilterEle(),
            "SALES_GROUP_NAME":  this.getInitSelectedFilterEle(),
            "SALES_OFFICE_NAME":  this.getInitSelectedFilterEle(),
            "sap_cc_number":  this.getInitSelectedFilterEle(),
            "district":  this.getInitSelectedFilterEle(),
            "PRODUCT_BRAND":  this.getInitSelectedFilterEle(),
            "PRODUCT_CODE":  this.getInitSelectedFilterEle(),
            "PRODUCT_NAME":  this.getInitSelectedFilterEle(),
            "state":  this.getInitSelectedFilterEle(),
            "taluka":  this.getInitSelectedFilterEle(),
            "user_persona":  this.getInitSelectedFilterEle(),
        }
    }
    private getInitSelectedFilterEle(){
        return {
            latest:new BehaviorSubject<Array<string> | undefined>(undefined),
            addedValue:new BehaviorSubject<string | undefined>(undefined),
            removedValue:new BehaviorSubject<string | undefined>(undefined),
        }
    }
    public getSelectedFilterLatestEle(key:keyof FilterIModel3) : Observable<string[] | undefined>{
        return  this.selectedFilters[key]?.latest ? this.selectedFilters[key]!.latest.asObservable() : of(undefined); 
    }  
    public setSelectedFilter(prop: keyof FilterIModel3, newList: Array<string> | undefined): void {
        this.selectedFilters[prop]?.latest.next(newList);
    }
    public deleteSelectedFilter(prop: keyof FilterIModel3): void {
        this.selectedFilters[prop]?.latest.next(undefined);
    }

    public addFilterValue(prop: keyof FilterIModel3, newValue: string ): void {
        if(!this.selectedFilters[prop]){

        }
        this.selectedFilters[prop]?.addedValue?.next(newValue);
    }
    public removeFilterValue(prop: keyof FilterIModel3, newValue: string ): void {
        this.selectedFilters[prop]?.removedValue?.next(newValue);
    }        

    destroy(){
        
    }

    
}