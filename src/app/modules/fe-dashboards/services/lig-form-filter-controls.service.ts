import { Injectable } from "@angular/core";
import { FilterIModel } from './../models/api/lig-data-reponse.model'
import { BehaviorSubject } from 'rxjs'
@Injectable()
export class LigFormFilterControlService{
    public filters$ : BehaviorSubject<FilterIModel | undefined> = new BehaviorSubject<FilterIModel | undefined>(undefined);

    constructor(){}
    public updateFilters(filters:FilterIModel):void {
        this.filters$.next(filters);
    }
}