import { Component, OnInit } from '@angular/core';
import { LigModel } from './../../../model/lig.model';
import { LigCsvDownloadService } from './../../../services/lig-csv-download.service';

import { LigDataService } from './../../../services/lig-data.service';
import { LigDashboardDataModel, LigDashboardAllHeaders } from './../../../model/lig-dashboard-data.model';

import { UserDetailsModel } from './../.././../../authorized-user/domain/model/user-details.model';

@Component({
  selector: 'app-lig-csv-download',
  templateUrl: './lig-csv-download.component.html',
  styleUrls: ['./lig-csv-download.component.css']
})
export class LigCsvDownloadComponent {

  public showPopup: boolean = false;
  public isDataLoading: boolean = false;
  constructor(private ligCsvDownloadService : LigCsvDownloadService,private userDetailsModel: UserDetailsModel,
    private ligDataService : LigDataService){
    console.log("At LigCsvDownloadComponent constructor");
  }
  public downloadSubmitClickHandler(duration: {fiscalYear : string ,month :string}){
    this.showPopup = false;
    this.isDataLoading = true;

    const userEmail = this.userDetailsModel.userDetails?.nameID! //gives email address
    const ligDataReqPayLoad = {
      "email":userEmail,
      "month":duration.month
    }
    this.ligDataService.getLigData(ligDataReqPayLoad).subscribe(
      (ligDataResponse:LigDashboardDataModel)=>{
        this.isDataLoading = false;
        this.ligCsvDownloadService.downloadFile(ligDataResponse);
      },
      (error)=>{
        this.isDataLoading = false;
      }
    )
  }
  public downloadClickHandler():void{
    this.showPopup =  true;
  }
  ngDestroy():void{

  }

}
