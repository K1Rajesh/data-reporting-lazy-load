import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LigCsvDownloadService } from './../../../services/lig-csv-download.service';
//import { LigDataService } from './../../../services/lig-data.service';

import { LigDataResponseModel } from '../../../models/api/lig-data-response.model';
import { LigDashboardTableApiHeaders, LigDashboardTableHeadersApiMapping } from '../../../models/lig-dashboard-data.model';

import { UserDetailsModel } from '../../../../authorized-user/domain/models/user-details.model';

import { LigDataRequestIModel ,LigDataFilterIModel } from "../../../../fe-dashboards/models/api/lig-data-request.model";
import {LigDataResponseIModel} from "../../../../fe-dashboards/models/api/lig-data-reponse.model";


import { FELigDataService } from "../../../../fe-dashboards/services/fe-lig-data.service";


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
  constructor(private ligCsvDownloadService : LigCsvDownloadService,private userDetailsModel: UserDetailsModel,
    private feLigDataService : FELigDataService){
    console.log("At LigCsvDownloadComponent constructor");
  }
  ngOnInit(){
    // this.csvDownloadHeaders = LigDashboardTableApiHeaders.map(header=>{
    //   const mappedHeader = LigDashboardTableHeadersApiMapping.get(header);
    //   return mappedHeader ? mappedHeader : header;
    // })
    this.csvDownloadHeaders = LigDashboardTableApiHeaders
  }
  public monthSelectModalSubmitHandler(appliedFilters:LigDataFilterIModel){
    this.showPopup = false;
    this.isDataLoading = true;

    const userEmail = this.userDetailsModel.userDetails?.nameID! //gives email address
    const ligDataReqPayLoad: LigDataRequestIModel ={
      user:{email:"abhisekdatta@corp.bharatpetroleum.com"} , // "sonawaneug@corp.bharatpetroleum.com"
      filters : appliedFilters,
      provideData:true
    };
    this.subsList.push(
      this.feLigDataService.getLigData(ligDataReqPayLoad).subscribe(
        (ligDataResponse:LigDataResponseIModel)=>{
          if(ligDataResponse.success && ligDataResponse.provideData && ligDataResponse.data){
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
