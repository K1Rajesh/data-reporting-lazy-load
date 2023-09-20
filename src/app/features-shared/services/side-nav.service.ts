import { Injectable } from '@angular/core';
import { SideNavListDTModel } from './../domain/model/side-nav.model';
import { CONST_VALUES } from './../../core/constant-reources';



@Injectable()
export class SideNavService {
    showSideNavButton : boolean = false;
    showSideNav : boolean = false;
    debugVar_myId :  number;
    public sideNavList:Map<number,SideNavListDTModel> = new Map<number,SideNavListDTModel>([
            [1, {id:1,name:CONST_VALUES.SIDENAV_ITEMS.HOME,hasSubMenu:false,showSubMenu:false, isEnabled:true}],
            [3, {id:3,name:CONST_VALUES.SIDENAV_ITEMS.LOGS,hasSubMenu:true,showSubMenu:false, isEnabled: true}],  //(Temp - isEnabled: true should not be on prod) for local testing
            [4, {id:4,name:CONST_VALUES.SIDENAV_ITEMS.INDEXING,hasSubMenu:false,showSubMenu:false, isEnabled: true}],  //(Temp - isEnabled: true should not be on prod) for local testing
        ]);
    constructor( ){
        this.debugVar_myId = Math.random()
    }
    setSideNavItemList(featureName:string){
        if(featureName == CONST_VALUES.FEATURES.RETAIL){
            this.sideNavList.set(2,{id:2,name:CONST_VALUES.SIDENAV_ITEMS.UFILL,hasSubMenu:true,showSubMenu:false, isEnabled: true})
        }
        else if(featureName == CONST_VALUES.FEATURES.Lubes){
            this.sideNavList.set(2,{id:2,name:CONST_VALUES.SIDENAV_ITEMS.LIG,hasSubMenu:true,showSubMenu:false, isEnabled: true})
        }
        
    }

    // setShowSideNavButton(val:boolean){
    //     this.showSideNavButton = val
    //     if(!val){
    //         this.setShowSideNav(false)
    //     }
    // }
    setShowSideNav(val:boolean){
        this.showSideNav = val
    }
    setShowSubSideNav(sideNavListId:number, showSubMenuVal: boolean ){
            const x = this.sideNavList.get(sideNavListId)
            if(x){
                x.showSubMenu = showSubMenuVal
                this.sideNavList?.set(sideNavListId , x )
            }

    }
    updateSideNavMapPrivilegedAccess(){
                //Enable Logs
                if(this.sideNavList.has(3)){
                    this.sideNavList.get(3)!.isEnabled =  true;
                }
                //Enable Indexing
                if(this.sideNavList.has(4)){
                    this.sideNavList.get(4)!.isEnabled =  true;
                }
    }

}