import { Component, OnInit } from '@angular/core';
import { LigModel } from './../../model/lig.model';

@Component({
  selector: 'app-lig',
  templateUrl: './lig.component.html',
  styleUrls: ['./../lubes/lubes.component.css','./lig.component.css']
})
export class LigComponent implements OnInit {

  uFillIconPath = "./assets/lig_logo_0904.png" //"./assets/lig_logo.jpg";
  constructor(private ligModel:LigModel){
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
  ngDestroy():void{
    console.log("At UfillComponent ngOnInit");
    this.ligModel.destroy();
  }

}
