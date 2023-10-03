import { Component, OnDestroy, OnInit } from '@angular/core';
import { CONST_VALUES } from './../../../../core/constant-reources'

import { ActivityLogModel } from './../../models/activity-log.model'
import { ActivityLogDModel} from './../../domain/models/activity-log.model'


@Component({
  selector: 'app-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrls: ['../logs/logs.component.css' ,'./activity-logs.component.css']
})
//
export class ActivityLogsComponent implements OnInit,OnDestroy {
  ActivityLogsTitle : string = CONST_VALUES.ACTIVITY_LOGS_TITLE
  fromDate : string;
  toDate : string;
  currentDate: Date = new Date();


  get headers():Array<string>{
    return this.activityLogModel.headers
  }
  get dataSource():Array<ActivityLogDModel>{
    return this.activityLogModel.dataSource;
  }
  constructor(
    private activityLogModel : ActivityLogModel ){
    
  }
  userSort(field:string, sortOrder:string){
    this.activityLogModel.userSort(field,sortOrder)
  }
  ngOnInit(){
    this.activityLogModel.init();
  }

  get searchName():string{
    return this.activityLogModel.searchName
  }
  set searchName(val:string){
    this.activityLogModel.searchName = val
  }
  get searchEmail():string{
    return this.activityLogModel.searchEmail
  }
  set searchEmail(val:string){
    this.activityLogModel.searchEmail = val
  }
  get navigateDistinctUsers():boolean{
    return this.activityLogModel.navigateDistinctUsers;
  }
  refineUserName(username: string) : string{
    return this.activityLogModel.refineUserName(username)
  }
  // selectedDate(when:string,event:any){
  //   this.activityLogModel.selectedDate(when,event)
  // }
  getDuration(logoutAt:Date | undefined,loginAt:Date |undefined){
    if(!logoutAt || !loginAt || new Date(logoutAt).getTime() > this.currentDate.getTime())
    return undefined
    return   Math.floor((new Date(logoutAt).getTime() - new Date (loginAt).getTime()) / (1000 *60))
  }
  getLogoutAt(logoutAt:Date | undefined){
    if (!logoutAt)
    return undefined;
    else
    return (new Date(logoutAt) > this.currentDate) ? undefined : logoutAt 
  }

              
  ngOnDestroy(){
    this.activityLogModel.destroy();
  }


}
