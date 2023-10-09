import { Injectable} from '@angular/core';

import { LigDataFilterIModel } from  "../../../fe-dashboards/models/api/lig-data-request.model";

import { LigFormFilterControlService } from '../../../fe-dashboards/services/lig-form-filter-controls.service';

@Injectable()
export class SelectedFiltersDisplayModel{
    public selectedFilters : LigDataFilterIModel;
    constructor(private ligFormFilterControlService  : LigFormFilterControlService){}
    init(){
        this.subscribeSelectedFilters();
    }
    public subscribeSelectedFilters(){
        this.ligFormFilterControlService.selctedFilters$.subscribe((selectedFilters)=>{
            if(selectedFilters){
                this.selectedFilters = selectedFilters;
            }
        })
    }
    destroy(){

    }
}