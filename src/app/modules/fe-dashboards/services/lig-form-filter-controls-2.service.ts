import { Injectable } from "@angular/core";
import { FilterIModel2 } from './../models/lig-dashboard-filter.model';


@Injectable()
export class LigFormFilterControlService2{

    public selectedFilters : FilterIModel2;
    
    constructor(){
        this.initSelectedFilters();
    }
    init(){

    }
    public initSelectedFilters():void{
        this.selectedFilters =  {
            "month":undefined,
            "FinancialYear": undefined
        }
 
    }
    public getSelectedFilter(prop: keyof FilterIModel2): Array<string>  | undefined{
        return this.selectedFilters[prop];
    }
    public setSelectedFilter(prop: keyof FilterIModel2, newValue: Array<string> ): void {
        this.selectedFilters[prop] = newValue;
    }  
    public addSelectedFilterValue(prop: keyof FilterIModel2, newValue: string ): void {
        // if(!this.selectedFilters[prop] || this.selectedFilters[prop]?.length ===0 ){
        //     this.selectedFilters[prop] = [newValue];
        //     return;
        // }
        this.selectedFilters[prop]!.push(newValue);
    }     
    public removeSelectedFilterValue(prop:keyof FilterIModel2, value:string):void{
        if(this.selectedFilters[prop] && this.selectedFilters[prop]!.length > 0){
            const valueIndex = this.selectedFilters[prop]!.indexOf(value)
            if(valueIndex >= 0 ){
                this.selectedFilters[prop]!.splice(valueIndex,1)
                if(this.selectedFilters[prop]?.length ===0){
                    delete this.selectedFilters[prop];
                }
            }
            
        }
    }
    destroy(){
        this.initSelectedFilters();
    }

    
}