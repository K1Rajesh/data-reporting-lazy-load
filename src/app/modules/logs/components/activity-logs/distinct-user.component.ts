import { Component, OnDestroy, OnInit } from '@angular/core';
import { DistinctUserModel} from './../../models/distinct-user.model'
import {DistinctUserDModel} from './../../domain/models/distinct-users.model'
import { ActivityLogModel } from './../../models/activity-log.model';


@Component({
    selector: 'app-distinct-user',
    templateUrl: './distinct-user.component.html',
    styleUrls: ['../logs/logs.component.css','./distinct-user.component.css']
  })
  
  export class DistinctUserComponent implements OnInit,OnDestroy {

    public get distinctUsersDataSource():Array<DistinctUserDModel>{
        return this.distunctUserModel.distinctUsersDataSource;
    }
 
    constructor(private distunctUserModel: DistinctUserModel, private activityLogModel: ActivityLogModel) { }

    ngOnInit( ): void {
        this.distunctUserModel.init();
    }
    ngOnDestroy(): void {
        this.distunctUserModel.destroy(); 
    }
    initDistinctUsers(){
        //this.activityLogModel.initDistinctUsers();
    }
    refineUserName(username: string) : string{
        return this.activityLogModel.refineUserName(username)
}
    userSort(sortOrder:string,sortField: string){
        this.distunctUserModel.userSortDistinctUser(sortOrder,sortField)
    }

}


