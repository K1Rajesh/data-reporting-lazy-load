import { Injectable } from "@angular/core";

import { Observable , Subscription} from 'rxjs';

import { FELigDataService } from '../../services/fe-lig-data.service';
import { LigFormFilterControlService} from './../../services/lig-form-filter-controls.service'


import { LigDataRequestIModel,LigDataFilterIModel,UserIModel } from './../../models/api/lig-data-request.model';
import { LigDataResponseIModel } from './../../models/api/lig-data-reponse.model';
import  { LigDashboardDataModel } from '../../models/lig-dashboard-data.model'

@Injectable()
export class LigDashboardModel3 {
    public ligDataSource : Array<LigDashboardDataModel> | undefined = undefined;
    public ligDataServiceLigData$ : Observable<LigDataResponseIModel> | undefined = undefined;
    private subsList : Array<Subscription> = new Array<Subscription>();
    
    constructor(private ligDataService:FELigDataService, 
      private ligFormFilterControlService:LigFormFilterControlService) {

    }
    init(){

    }

    public initateGetLigDataCall(filters:LigDataFilterIModel, provideData : boolean, user?: UserIModel ){
      const dummyUser = {
        "email": "abhisekdatta@corp.bharatpetroleum.com" , // "sonawaneug@corp.bharatpetroleum.com",
      };
      const payLoad:LigDataRequestIModel = {
        "user": user ? user : dummyUser,
        filters: filters,
        "provideData":provideData
      }
      this.ligDataServiceLigData$ = this.ligDataService.getLigData(payLoad);
      this.subscribeGetLigDataCall();
    }
    private subscribeGetLigDataCall(){
        this.subsList.push(
            this.ligDataServiceLigData$!
            .subscribe(
              (ligData : LigDataResponseIModel ) =>{
                if(ligData && ligData.success ){
                  if( ligData.provideData && ligData.data){
                    //console.log(ligData);
                    this.initDataSource(ligData.data)
                  }       
                  if(ligData.filters){
                    this.ligFormFilterControlService.updateFilters(ligData.filters);
                  }
                }
              }, 
              (err:any) =>{console.log("getLigData API Error: ",err)} 
            )
          )    
    }
    public initDataSource(ligData : Array<LigDashboardDataModel>){
        this.ligDataSource = ligData
    }
   
    public destroy():void{
        this.subsList.forEach((sub)=>sub.unsubscribe())
    }
}
