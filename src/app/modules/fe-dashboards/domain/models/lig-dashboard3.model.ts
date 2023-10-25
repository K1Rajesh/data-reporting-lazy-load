import { Injectable } from "@angular/core";

import { Observable , Subscription} from 'rxjs';

import { LigDataModel } from "./lig-data.model";

import { LigDataFilterIModel,UserIModel } from './../../models/api/lig-data-request.model';
import { LigDataResponseIModel } from './../../models/api/lig-data-reponse.model';
import  { LigDashboardDataModel } from '../../models/lig-dashboard-data.model'

@Injectable()
export class LigDashboardModel3 {
    public ligDataSource : Array<LigDashboardDataModel> | undefined = undefined;
    //public ligDataServiceLigData$ : Observable<LigDataResponseIModel | undefined>;
    private subsList : Array<Subscription> = new Array<Subscription>();
    // get ligDataServiceLigData$(){
    //   return this.ligDataModel.ligFilterResponse$
    // } 
    constructor(private ligDataModel : LigDataModel ) {

    }
    init(){
      //this.ligDataServiceLigData$ = this.ligDataModel.ligFilterResponse$
      this.subscribeGetLigDataCall();
    }
    public initateGetLigDataCall(filters:LigDataFilterIModel, provideData : boolean, user?: UserIModel ){
      // this.ligDataModel.initLigDataCall();
      
    }
    private subscribeGetLigDataCall(){
        this.subsList.push(
            this.ligDataModel.getLigDataResponse()!
            .subscribe(
              (ligData : LigDataResponseIModel | undefined) =>{
                if(ligData && ligData.success && ligData.provideData && ligData.data){
                    //console.log(ligData);
                    this.initDataSource(ligData.data)   
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
