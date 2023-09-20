import { Injectable } from "@angular/core";

import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router"

import { CONST_VALUES } from './../../core/constant-reources';

import { SideNavListDataModel } from './../domain/model/side-nav.model';

import { ConfigService } from "./../services/config.service";
import { AuthService } from "./../../services/auth.service";
import { SideNavService } from "./../services/side-nav.service";

import { SamlLogService } from "./../../logs/services/saml-log.service";


import { UserDetails } from './../domain/model/user-details.model'




@Injectable()
export class SideNavModel{

    public featureName:string;
    subsList: Array<Subscription> = new Array<Subscription>();
    private ligDashboardsList:Array<string>
    private uFillDashboardsList:Array<string> 
    sideNavList:Array<SideNavListDataModel>

    constructor(private configService :ConfigService, 
        private authService: AuthService,
        private UiLogService: SamlLogService,
        private sideNavService : SideNavService,
        private router:Router,
        private activatedRoute:ActivatedRoute
        ){
    }
    public init(){
        this.setSideNavItemList(this.featureName)
        this.subscribeSourceConfig();
        this.subscribeAuthenticatedEvent();
    }
    setSideNavItemList(featureName:string){
        this.sideNavService.setSideNavItemList(featureName)
        this.setSideNavList()
    }
    public setSideNavList(){
        this.sideNavList = [...this.sideNavService.sideNavList.values()]
    }
    
    public getSubNavItemList(navItem:string): Array<string>{
        let subNavItemList: Array<string> = [];
        if(navItem === CONST_VALUES.SIDENAV_ITEMS.UFILL){
          subNavItemList = this.uFillDashboardsList;
        }
        if(navItem === CONST_VALUES.SIDENAV_ITEMS.LIG){
            subNavItemList = this.ligDashboardsList;
          }
        else if(navItem === 'Logs'){
            subNavItemList = ['User Activity Log','Show distinct users', 'Reports accessed count'];
            //'Reports accessed users',,'Last 5 days users','Last 5 days reports'
        }
        return subNavItemList
    }    
    public subscribeSourceConfig():void{
        const var1 = new Map(Object.entries( this.configService.config.ufillHirearchyMaps));
        this.uFillDashboardsList = [...var1.keys()];
        const var2 = new Map(Object.entries( this.configService.config.ligHirearchyMaps));
        this.ligDashboardsList = [...var2.keys()];
    }
    public subscribeAuthenticatedEvent():void{
        this.subsList.push(
            this.authService.userSuccessfullyAuthenticatedEvent
            .pipe(distinctUntilChanged())
            .subscribe((authResp:boolean)=>{
                if(authResp ){
                    this.getUserDetails()
                }   
        }) 
        )
    }
    public logout(){
        this.authService.logout()
        
    }
    public addUiLogReports(actionItem: string, report : string = ""){
        if(['ufill','lig'].includes(actionItem.toLowerCase())){
            this.UiLogService.addUiLog(actionItem, report);
        }
    }
    public getUserDetails() : void {
        this.authService.getUserDetails().subscribe((userDetails: UserDetails)=>{
            this.enableSideNavMenuItems(userDetails);
        })
    }
    public enableSideNavMenuItems(userDetails: UserDetails){
        if(userDetails && userDetails.isPrivilegeUser){
            this.updateSideNavListMap();
        }
    }
    updateSideNavListMap(){
        this.sideNavService.updateSideNavMapPrivilegedAccess();
        this.updateSideNavList();
    }
    updateSideNavList(){
        const sortedEntries = [...this.sideNavService.sideNavList.entries()].sort((a,b)=>a[0]-b[0])
        this.sideNavList = sortedEntries.map((entry)=>entry[1]);
    }
    public selectSideNavItem(sideNavItemName:string){

        this.router.navigate([sideNavItemName],{relativeTo:this.activatedRoute})

    }
    public setShowSideNav(val:boolean){
        this.sideNavService.setShowSideNav(val)
    }
    public setShowSubSideNav(arg1:number,arg2:boolean){
        this.sideNavService.setShowSubSideNav(arg1,arg2)
    }
    get showSideNav():boolean{
        return this.sideNavService.showSideNav
      }
    public destroy(){
        this.subsList?.forEach((sub)=>{
            sub.unsubscribe();
        })
    }
}