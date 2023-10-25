import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';

import { LigCsvDownloadService } from './../../../services/lig-csv-download.service';

import { LigDataResponseModel } from '../../../models/api/lig-data-response.model';
import { LigDashboardTableApiHeaders, LigDashboardTableHeadersApiMapping } from '../../../models/lig-dashboard-data.model';

import {LigDataResponseIModel} from "../../../../fe-dashboards/models/api/lig-data-reponse.model";

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
      .subscribe((ligDataResponse:LigDataResponseIModel | undefined)=>{
          if(ligDataResponse?.success && ligDataResponse?.provideData && ligDataResponse?.data){
            this.isDataLoading = false;
            this.ligCsvDownloadService.downloadFile(ligDataResponse.data, this.csvDownloadHeaders, LigDashboardTableHeadersApiMapping );
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
