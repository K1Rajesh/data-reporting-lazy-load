import { Injectable} from '@angular/core';

import { FiltersAvailable } from '../../../fe-dashboards/domain/models/available-filters.model'
import { FilterIModel5 } from '../../../fe-dashboards/models/lig-dashboard-filter.model'

import { LigFormFilterControlService3 } from '../../../fe-dashboards/services/lig-form-filter-controls-3.service';

@Injectable()
export class SelectedFiltersDisplayModel{
    public selectedFilters : FilterIModel5 = {
      "SALES_GROUP_NAME": undefined,
      "SALES_OFFICE_NAME": undefined,
      "sap_cc_number": undefined,
      "district": undefined,
      "PRODUCT_BRAND": undefined,
      "PRODUCT_CODE": undefined,
      "PRODUCT_NAME": undefined,
      "state": undefined,
      "taluka": undefined,
      "user_persona": undefined,
      "month":undefined,
      "FinancialYear":undefined
    };
    private filtersAvailable : Array<string> = FiltersAvailable;
    constructor(private ligFormFilterControlService3  : LigFormFilterControlService3){}
    init(){
        this.subscribeSelectedFilters();
    }
    private subscribeSelectedFilters():void{
        this.filtersAvailable.forEach(filter=>{
          this.ligFormFilterControlService3?.selectedFilters[filter]?.latest?.subscribe((filterList : string[] | undefined)=>{
            if(filterList){
              this.selectedFilters[filter] = filterList.join();
            }

          })
          this.ligFormFilterControlService3?.selectedFilters[filter]?.removedValue?.subscribe((filterValue)=>{
            //this.updateFiltersOptionsSelected(this.filterFormControls,"remove",filter,filterValue);
          })
          this.ligFormFilterControlService3?.selectedFilters[filter]?.addedValue?.subscribe((filterValue)=>{
           // this.updateFiltersOptionsSelected(this.filterFormControls,"add",filter,filterValue);
          })
        })
      }
    destroy(){

    }
}