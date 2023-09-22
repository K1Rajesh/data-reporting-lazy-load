import { Component, OnInit } from '@angular/core';
import { LigModel } from './../../model/lig.model';
import { LigCsvDownloadService } from './../../services/lig-csv-download.service';

@Component({
  selector: 'app-lig',
  templateUrl: './lig.component.html',
  styleUrls: ['./../lubes/lubes.component.css','./lig.component.css']
})
export class LigComponent implements OnInit {

  uFillIconPath = "./assets/lig_logo_0904.png" //"./assets/lig_logo.jpg";
  public showPopup: boolean = false;
  constructor(private ligModel:LigModel, private ligCsvDownloadService : LigCsvDownloadService){
    console.log("At LigComponenet constructor");
  }

  ngOnInit(): void {
    console.log("At LigComponenet ngOnInit");
    this.ligModel.init();
  }

  get dashboardLink(): string{
    return this.ligModel.dashboardLink;
  }
  get hirearchyDashboards(){
    return this.ligModel.hirearchyDashboards;
  }
  get dasboardLinkEmpty():boolean {
      return this.dashboardLink == "" ? true: false
  }
  public downloadSubmitClickHandler(duration: {fiscalYear : string ,month :string}){
    this.showPopup = false;
    this.ligCsvDownloadService.intiateCsvDownload(duration)
  }
  public downloadClickHandler():void{
    this.showPopup =  true;
  }
  ngDestroy():void{
    console.log("At UfillComponent ngOnInit");
    this.ligModel.destroy();
  }

}
