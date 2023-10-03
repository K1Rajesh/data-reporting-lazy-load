import { Component, OnInit,OnDestroy,Input, Output,EventEmitter } from '@angular/core';
import { SideNavModel } from '../../models/side-nav.model';
import { SideNavListDataModel } from '../../domain/models/side-nav.model'

import { CONST_VALUES } from '../../../../core/constant-reources';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit, OnDestroy {

  @Input('featureName') 
  set featureName(value:string){
    this.sideNavModel.featureName = value
  }
  public selectedNavItem : string;
  constructor(private sideNavModel:SideNavModel) { }


  ngOnInit(): void {
    console.log("At SideNavComponent ngOnInit");
    this.sideNavModel.init();
  }
  get sideNavList():Array<SideNavListDataModel>{
    return this.sideNavModel.sideNavList;
  }  
  
  public getSubNavItemList(navItem:string): Array<string>{
    return this.sideNavModel.getSubNavItemList(navItem);
  }  
  public selectSideNavItem(navItem:SideNavListDataModel){
    this.selectedNavItem = navItem.name;
    navItem.showSubMenu = !navItem.showSubMenu;
  }
  public selectSideNavSubItem(navItemName:string, report: string){
    this.sideNavModel.addUiLogReports(navItemName, report); 
  }
  public selectLogSideNav(navItem:SideNavListDataModel){
    this.selectedNavItem = navItem.name;
    navItem.showSubMenu = !navItem.showSubMenu;  
  }
  public getRouteLink(navItemName:string,subNavItemName:string|undefined = undefined):string{
    const navItemNameLowercase = navItemName.toLowerCase()
    let path = ""
    if(!subNavItemName && navItemNameLowercase === "home"){
      path = "../home"
    }
    else if(["ufill","lig"].includes(navItemNameLowercase)){
      path = navItemNameLowercase
    }
    else if(!subNavItemName && ["ufill","logs","indexing"].includes(navItemNameLowercase)){
      path = navItemNameLowercase
    }
    else if( navItemNameLowercase==="logs"){
      path = subNavItemName? navItemNameLowercase + '/' + subNavItemName : navItemNameLowercase
    }
    else if( navItemNameLowercase== CONST_VALUES.SIDENAV_ITEMS.FE_DASHBOARDS.toLowerCase()){
      path = navItemNameLowercase
    }
    return path;
  }
  public logout(){
    this.sideNavModel.logout();
  }
  public ngOnDestroy(): void{
    this.sideNavModel.destroy();
  }



}
