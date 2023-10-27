import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';

import { LigCsvDownloadService } from './../../services/lig-csv-download.service';

import { LigDashboardTableApiHeaders, LigDashboardTableHeadersApiMapping } from './../../models/lig-dashboard-data.model';

//* FEDashbaords Module*//
import {LigDataApiResponseIModel} from "../../../fe-dashboards/models/api/lig-data-reponse.model";

import { LigDataModel} from "../../../fe-dashboards/domain/models/lig-data.model";

@Component({
  selector: 'app-lig-csv-download-2',
  templateUrl: './lig-csv-download-2.component.html',
  styleUrls: ['./lig-csv-download-2.component.css']
})
export class LigCsvDownloadComponent2 implements OnInit, OnDestroy {


  public isDataLoading: boolean = false;
  public csvDownloadHeaders: Array<string> = new Array<string>();
  private subsList : Array<Subscription> = new Array<Subscription>();


  constructor(private ligCsvDownloadService : LigCsvDownloadService,
    private ligDataModel : LigDataModel ){
    console.log("At LigCsvDownloadComponent constructor");
  }
  ngOnInit(){
    this.csvDownloadHeaders = LigDashboardTableApiHeaders
  }

  public downloadClickHandler():void{

    this.isDataLoading = true;
    
    this.ligDataModel.getLigDataResponse()
    .subscribe(
      (ligDataResponse:LigDataApiResponseIModel | undefined)=>{
      if(ligDataResponse?.isLoading){
        this.isDataLoading = true;
      }
      else if(
        (!ligDataResponse?.isLoading && ligDataResponse?.isSuccess) && 
        ligDataResponse?.data?.provideData && 
        ligDataResponse?.data?.data
      )
        {
          this.isDataLoading = false;
          this.ligCsvDownloadService.downloadFile(ligDataResponse.data.data, this.csvDownloadHeaders, LigDashboardTableHeadersApiMapping );
        }
      },
      (error)=>{
        this.isDataLoading = false;
      }
    )
    .unsubscribe();

  }
  ngOnDestroy():void{
    this.subsList.forEach((sub)=>sub.unsubscribe());
  }

}
