import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

import { FilterIModel as FilterRespIModel } from './../models/api/lig-data-reponse.model';
import { LigDataFilterIModel } from  "../models/api/lig-data-request.model";

import { FilterIModel } from './../models/lig-dashboard-filter.model';


@Injectable()
export class LigFormFilterControlService{
    public selectedFilters : FilterIModel;

    constructor(){
        this.initSelectedFilters();
    }
    init(){

    }
    public initSelectedFilters():void{
        this.selectedFilters =  {
            "SALES_GROUP_NAME": new BehaviorSubject<Array<string> | undefined>(undefined),
            "SALES_OFFICE_NAME": new BehaviorSubject<Array<string> | undefined>(undefined),
            "sap_cc_number": new BehaviorSubject<Array<string> | undefined>(undefined),
            "district": new BehaviorSubject<Array<string> | undefined>(undefined),
            "PRODUCT_BRAND": new BehaviorSubject<Array<string> | undefined>(undefined),
            "PRODUCT_CODE": new BehaviorSubject<Array<string> | undefined>(undefined),
            "PRODUCT_NAME": new BehaviorSubject<Array<string> | undefined>(undefined),
            "state": new BehaviorSubject<Array<string> | undefined>(undefined),
            "taluka": new BehaviorSubject<Array<string> | undefined>(undefined),
            "user_persona": new BehaviorSubject<Array<string> | undefined>(undefined),
            "month":new BehaviorSubject<Array<string> | undefined>(undefined),
            "FinancialYear": new BehaviorSubject<Array<string> | undefined>(undefined),
        }
 
    }
    public getSelectedFilter(prop: keyof FilterIModel): Observable<Array<string>  | undefined>{
        return this.selectedFilters[prop].asObservable();
    }
    public setSelectedFilter(prop: keyof FilterIModel, newValue: Array<string>  | undefined): void {
        this.selectedFilters[prop].next(newValue);
    }
    // public addFilterValue(prop: keyof FilterIModel, newValue: string ): void {
    //     this.selectedFilters[prop].next(newValue);
    // }        
    public deleteSelectedFilter(prop:keyof FilterIModel):void{
        this.selectedFilters[prop].next(undefined);
    }
    destroy(){
        
    }

    
}