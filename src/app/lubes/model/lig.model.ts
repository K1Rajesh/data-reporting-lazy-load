import { Injectable } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { SideNavModel } from '../../features-shared/models/side-nav.model';

import { ConfigService } from './../../features-shared//services/config.service';




@Injectable()
export class LigModel{


    public hirearchyDashboards: Map<string, string>  = new Map<string, string>();
  
    _dashboardLink:string = "";
    constructor(private ligConfigService :ConfigService,private route: ActivatedRoute,
      private sideNavModel: SideNavModel
      ){}
  public init(): void{
    this.subscribeSourceConfig();
    this.subscribeQueryParams();

    //Handling the show side nav after routing rather than subfeature select button click because
    // these pages may be directly accessed like by cliq users
    this.showSideNav();
    
  }
  get dashboardsNamesList():Array<string>{
     return [...this.hirearchyDashboards?.keys()];
  }
  get dashboardsListLenght():number{
    return this.dashboardsNamesList?.length;
 }
  get dashboardLink():string{
    return this._dashboardLink;
  }
  set dashboardLink(dashboardLink:string){
    this._dashboardLink = dashboardLink;
  }
  public subscribeQueryParams(){
    this.route.queryParams.subscribe((queryParams)=>{
      console.log("Lig queryParams: ",queryParams)
      if(
          queryParams?.dashboard && this.dashboardsNamesList &&
          this.hirearchyDashboards
        ){
          this.dashboardLink = this.hirearchyDashboards.get(queryParams.dashboard) || "";

      }
      else if(!queryParams || !queryParams.dashboard){
            this.dashboardLink="";
      }      
    })
  }

  public subscribeSourceConfig():void{
      this.hirearchyDashboards  =  new Map(Object.entries( this.ligConfigService.config.ligHirearchyMaps )) 
  }
  private showSideNav(){
    Promise.resolve().then(()=>{
       //This is affecting back the values on parent after the Change detection completion,
       // so making it async so as to move the updates no next cycle
      this.sideNavModel.setShowSideNav(true)
      this.sideNavModel.setShowSubSideNav(2,true);
    })
  }
  public destroy(): void{

  }
}