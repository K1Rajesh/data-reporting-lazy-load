import { Injectable } from "@angular/core";
import { Subscription } from 'rxjs'

import { CONST_VALUES } from "./../../../core/constant-reources";

import { ActivityLogDModel, UserDModel } from './../domain/models/activity-log.model'

import { SamlLogService } from './../services/saml-log.service'
import { UtilService } from "./../../../core/services/util.service";


@Injectable({
        providedIn:'root'
})
export class ActivityLogModel{
    searchName:string = '';
    searchEmail:string = '';
    headers: Array<string>;
    dataSource: Array<ActivityLogDModel>; 
    savedDataSourceCopy: Array<ActivityLogDModel>; 
    subscriptionsList:Array<Subscription>;
    distinctUsers:Array<UserDModel| undefined>;
    navigateDistinctUsers: boolean;
    fromDuration: Date | undefined;
    toDuration: Date | undefined;
    constructor(private samlLogService: SamlLogService, private utilService : UtilService){

    }
    init(){
        this.headers = new Array<string>();
        this.dataSource = new  Array<ActivityLogDModel>();
        this.subscriptionsList = new Array<Subscription>();
        this.subscribeSamlLogData();
    }
    destroy(){
        this.subscriptionsList.forEach((sub:Subscription)=>{
            sub.unsubscribe();
        })
    }
    subscribeSamlLogData(){
        this.subscriptionsList.push(
            this.samlLogService.getActivityLogs().subscribe((result:ActivityLogDModel[])=>{
                if(result){
                  console.log("getActivityLogs: ",result)
                  this.updateHeaders(result)
                  this.updateDataSource(result)
                  
                }
              })
        )
    }
    updateHeaders(result:ActivityLogDModel[]): void{
        this.headers = Object.keys(result[0])
    }
    updateDataSource(result:ActivityLogDModel[]): void{

        this.dataSource = result
        this.dataSource.sort((obj_1:ActivityLogDModel,obj_2:ActivityLogDModel)=>{
            if(obj_1.date > obj_2.date){
                return -1
            }
            else if (obj_1.date < obj_2.date ){
                return 0
            }
            return 0
        });
        this.savedDataSourceCopy = JSON.parse(JSON.stringify(this.dataSource))
    }
    userSort(field:string, sortOrder:string){        
        this.dataSource.sort((obj_1:ActivityLogDModel,obj_2:ActivityLogDModel)=>{
                if(field === "user"){
                    if((obj_1[field].toLocaleLowerCase() > obj_2[field].toLocaleLowerCase())){
                        return sortOrder==="desc" ?  -1 : 1
                    }
                    else if(obj_1[field].toLocaleLowerCase() < obj_2[field].toLocaleLowerCase()){
                        return sortOrder==="desc" ? 1 : -1
                    }
                return 0
                }
                else if( field === "date" ){
                    if((obj_1[ field ] > obj_2[field])){
                        return sortOrder==="desc" ?  -1 : 1
                    }
                    else if(obj_1[field] < obj_2[field]){
                        return sortOrder==="desc" ? 1 : -1
                    }
                return 0                  
                }
                else if(field === "duration"){
                    if(!obj_1[field ]  && (obj_2[field] || obj_2[field]===0))
                    { return sortOrder==="desc" ?  1 : -1 }
                    else if(!obj_2[field ]  && (obj_1[field] || obj_1[field]===0))
                    { return sortOrder==="desc" ?  -1 : 1 }
                    return sortOrder==="desc" ?  ( obj_2[field ]! - obj_1[field ]!) : ( obj_1[field ]! - obj_2[field ]!)  ;  
                }
                return 0
        })
    }
    userSortDistinctUser(sortOrder:string){
        if(!this.distinctUsers || this.distinctUsers.length < 1){
            return;
        }
        this.distinctUsers.sort((obj_1:UserDModel|undefined,obj_2:UserDModel|undefined)=>{
            if(obj_1!.user!.toLocaleLowerCase() > obj_2!.user!.toLocaleLowerCase() ){
                return sortOrder==="desc" ?  -1 : 1
            }
            else if(obj_1!.user.toLocaleLowerCase()  < obj_2!.user.toLocaleLowerCase() ){
                return sortOrder==="desc" ? 1 : -1
            }
            return 0
        })
    }
    refineUserName(username: string):string{
        return this.utilService.refineUserName(username)
    }
    initDistinctUsers(){
        let tempSet:Set<string> = new Set<string>();
        let tempSol   = this.dataSource.map((obj:ActivityLogDModel)=>{
            if(!tempSet.has(obj.user)){
                tempSet.add(obj.user)
                return {
                    user:obj.user,
                    emailId:obj.emailId,
                    date:obj.date
                }
            }
            else{
 
                return undefined 
            }
        })
        this.distinctUsers = tempSol.filter(obj=>
             obj!==undefined
        ); 
    }
    // selectedDate(when:string,event:any){
    //     const setDate = event?.target?.value?.trim() ? new Date(event.target.value) : undefined
    //     if(when===CONST_VALUES.FROM ){
    //         this.fromDuration = setDate
    //     }
    //     else if(when===CONST_VALUES.TO){
    //         this.toDuration = setDate
    //     }
    //     if(this.fromDuration  && this.toDuration){

    //     }
    // }

}