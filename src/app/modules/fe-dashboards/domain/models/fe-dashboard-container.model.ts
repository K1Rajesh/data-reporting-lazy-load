
import { Injectable } from "@angular/core";
import { FilterIModel, LigDataApiResponseIModel } from './../../models/api/lig-data-reponse.model';
import { LigDataModel } from "./lig-data.model";

@Injectable()
export class FEDashboardContainerModel {
    public isShowTableLoader : boolean;
    
    constructor(private ligDataModel : LigDataModel){

    }
    public init():void{
        this.subscribeGetLigDataCall();
    }
    subscribeGetLigDataCall(){
        this.ligDataModel.getLigDataResponse()
        .subscribe((ligDataResponse:LigDataApiResponseIModel | undefined)=>{
            if(
              (!ligDataResponse?.isLoading && ligDataResponse?.isSuccess)
            ){
              this.isShowTableLoader = false;

            }
            else if(ligDataResponse?.isLoading ) {
                this.isShowTableLoader = true;
  
            }
          },

        )      
    }
    public destroy():void{

    }
}