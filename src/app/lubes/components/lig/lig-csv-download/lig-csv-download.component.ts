import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LigCsvDownloadService } from './../../../services/lig-csv-download.service';
import { LigDataService } from './../../../services/lig-data.service';

import { LigDataResponseModel } from '../../../models/api/lig-data-response.model';
import { LigDashboardTableApiHeaders, LigDashboardTableHeadersApiMapping } from '../../../models/lig-dashboard-data.model';

import { UserDetailsModel } from '../../../../authorized-user/domain/models/user-details.model';

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
    private ligDataService : LigDataService){
    console.log("At LigCsvDownloadComponent constructor");
  }
  ngOnInit(){
    this.csvDownloadHeaders = LigDashboardTableApiHeaders.map(header=>{
      const mappedHeader = LigDashboardTableHeadersApiMapping.get(header);
      return mappedHeader ? mappedHeader : header;

    })
  }
  public monthSelectModalSubmitHandler(duration: 
    {fiscalYear : string | undefined ,month :string | undefined}){
    this.showPopup = false;
    this.isDataLoading = true;

    const userEmail = this.userDetailsModel.userDetails?.nameID! //gives email address
    const ligDataReqPayLoad = {
      "email":userEmail,
      "month":duration?.month || "2023-09"
    }
    this.subsList.push(
      this.ligDataService.getLigData(ligDataReqPayLoad).subscribe(
        (ligDataResponse:LigDataResponseModel)=>{
          this.isDataLoading = false;
          this.ligCsvDownloadService.downloadFile(ligDataResponse, this.csvDownloadHeaders );
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
