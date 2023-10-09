import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

import { FilterIModel } from './../models/api/lig-data-reponse.model';
import { LigDataFilterIModel } from  "../models/api/lig-data-request.model";


@Injectable()
export class LigFormFilterControlService{
    public filters$ : BehaviorSubject<FilterIModel | undefined> = new BehaviorSubject<FilterIModel | undefined>(undefined);
    public selctedFilters$ : BehaviorSubject<LigDataFilterIModel | undefined> = new BehaviorSubject<LigDataFilterIModel | undefined>(undefined);


    constructor(){}
    public updateFilters(filters:FilterIModel):void {
        this.filters$.next(filters);
    }
    public emitSelectedFilters(filters:LigDataFilterIModel):void {
        this.selctedFilters$.next(filters);
    }
}