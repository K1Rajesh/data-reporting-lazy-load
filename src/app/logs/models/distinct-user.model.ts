import { Injectable } from '@angular/core';
import { AnalyticsLogService } from '../services/analytic-logs.service';
import { Subscription } from 'rxjs';
import {DistinctUserDModel} from '../domain/models/distinct-users.model'

@Injectable({
    providedIn: 'root'
})
export class DistinctUserModel{
    private subssList: Array<Subscription> = new Array<Subscription>();
    public distinctUsersDataSource: Array<DistinctUserDModel>;
    constructor(private analyticsService: AnalyticsLogService){

    }
    public init(): void{
        this.subscribeDistinctUsers()
    }
    private subscribeDistinctUsers(): void{
        this.subssList.push(
            this.analyticsService.getDistinctUsers()
            .subscribe((distinctUsers: DistinctUserDModel[])=>{
                this.distinctUsersDataSource = distinctUsers;
            })
        );
    }
    public userSortDistinctUser(sortOrder:string,sortField: string){
        if(  sortField == 'userName'){
            if(!this.distinctUsersDataSource || this.distinctUsersDataSource.length <= 1){
                return;
            }
            this.distinctUsersDataSource.sort((obj_1:DistinctUserDModel|undefined,obj_2:DistinctUserDModel|undefined)=>{
                if(obj_1!._id!.user!.toLocaleLowerCase() > obj_2!._id!.user!.toLocaleLowerCase() ){
                    return sortOrder==="desc" ?  -1 : 1
                }
                else if(obj_1!._id!.user!.toLocaleLowerCase()  < obj_2!._id!.user!.toLocaleLowerCase() ){
                    return sortOrder==="desc" ? 1 : -1
                }
                return 0
            })         
        }     
        else if( sortField === "loginAt" ){
            this.distinctUsersDataSource.sort((obj_1:DistinctUserDModel ,obj_2:DistinctUserDModel)=>{
                if((obj_1.date > obj_2.date)){
                    return sortOrder==="desc" ?  -1 : 1
                }
                else if(obj_1.date < obj_2.date){
                    return sortOrder==="desc" ? 1 : -1
                }
            return 0      
            })             
        } 
    }
    public destroy(): void{
        this.subssList.forEach(subscription => subscription.unsubscribe());
    }


}