import { Injectable} from '@angular/core';
import { Subscription} from 'rxjs'

import { FiltersAvailable } from '../../../fe-dashboards/domain/models/available-filters.model'
import { ConcatedFiltersIModel } from '../../../fe-dashboards/models/lig-dashboard-filter.model'

import { LigFormFilterControlService3 } from '../../../fe-dashboards/services/lig-form-filter-controls-3.service';
import { LigDataModel } from '../../../fe-dashboards/domain/models/lig-data.model';

@Injectable()
export class SelectedFiltersDisplayModel{
    public selectedFilters : ConcatedFiltersIModel = {
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
    private subsList : Array<Subscription | undefined> = new Array<Subscription | undefined>();
    constructor(private ligFormFilterControlService3  : LigFormFilterControlService3,
      private ligDataModel : LigDataModel){}
    init(){
        this.subscribeSelectedFilters();
    }
    private subscribeSelectedFilters():void{
        this.filtersAvailable.forEach(filter=>{
          this.subsList.push(
            this.ligFormFilterControlService3?.selectedFilters[filter]?.latest?.subscribe((filterList : string[] | undefined)=>{
              if(filterList){
                this.selectedFilters[filter] = filterList.join();
              }
              else{
                this.selectedFilters[filter] = undefined
              }
  
            })
          )
        })
    }
    public euiBadgeClickHandler(filterKey:string):void{
      this.ligFormFilterControlService3.deleteSelectedFilter(filterKey);
      this.ligDataModel.initLigDataCall(true)
    }
    destroy(){
      this.subsList.forEach(sub=>sub?.unsubscribe)
    }
}