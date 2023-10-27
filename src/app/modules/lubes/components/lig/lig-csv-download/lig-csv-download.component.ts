import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';

import { LigCsvDownloadService } from '../../../../fe-dashboards-features-shared/services/lig-csv-download.service';

import { LigDataResponseModel } from '../../../models/api/lig-data-response.model';
import { LigDashboardTableApiHeaders, LigDashboardTableHeadersApiMapping } from '../../../../fe-dashboards-features-shared/models/lig-dashboard-data.model';

import {LigDataApiResponseIModel} from "../../../../fe-dashboards/models/api/lig-data-reponse.model";

import { LigDataModel} from "../../../../fe-dashboards/domain/models/lig-data.model";

@Component({
  selector: 'app-lig-csv-download',
  templateUrl: './lig-csv-download.component.html',
  styleUrls: ['./lig-csv-download.component.css']
})
export class LigCsvDownloadComponent implements OnInit, OnDestroy {

  public showPopup: boolean = false;
  public isDataLoading: boolean = false;
  public csvDownloadHeaders: Array<string> = new Array<string>();
  private subsList : Array<Subscription> = new Array<Subscription>();
  //public ligDataServiceLigData$ : Observable<LigDataResponseIModel | undefined>;

  // get ligDataServiceLigData$() {
  //   return this.ligDataModel.ligDataResponse$;
  // } 

  constructor(private ligCsvDownloadService : LigCsvDownloadService,
    private ligDataModel : LigDataModel ){
    console.log("At LigCsvDownloadComponent constructor");
  }
  ngOnInit(){
    // this.csvDownloadHeaders = LigDashboardTableApiHeaders.map(header=>{
    //   const mappedHeader = LigDashboardTableHeadersApiMapping.get(header);
    //   return mappedHeader ? mappedHeader : header;
    // })
    //this.ligDataServiceLigData$ = this.ligDataModel.ligDataResponse$;
    this.csvDownloadHeaders = LigDashboardTableApiHeaders
  }
  public monthSelectModalSubmitHandler(){
    this.showPopup = false;
    this.isDataLoading = true;

    this.ligDataModel.initLigDataCall(true);


    this.subsList.push(
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
    )

  }
  public monthSelectModalCloseHandler():void{
    this.showPopup =  false;
  }
  public downloadClickHandler():void{
    this.showPopup =  true;
  }
  ngOnDestroy():void{
    this.subsList.forEach((sub)=>sub.unsubscribe());
  }

}
