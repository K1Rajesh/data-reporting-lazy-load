import { Injectable, Type } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable,of } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ActivityLogDModel } from "./../domain/models/activity-log.model";
import { UiLogModel } from "./../domain/models/ui-log.model";

@Injectable({
    providedIn:'root'
})
export class SamlLogService{
    httpOptions = {};
    constructor(private httpClient:HttpClient){
        this. httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' :'application/json'
            })  
        } 
     }

    getActivityLogs():Observable<Array<ActivityLogDModel>>{
        return this.httpClient.get<Array<ActivityLogDModel>>(  environment.samlSPUrl + '/get-data/samlDlogs')
        // .pipe(
        //     map((result:Array<ActivityLogDModel>)=>{
        //         result
        //     })
        // )
    }
    getUiLogs(requestBody:any):Observable<Array<UiLogModel>>{
        //http://10.29.2.4:3002/get-data/samlDlogsUi
        //saml-sp-logs
        return this.httpClient.post<Array<UiLogModel>>(environment.samlSPUrl +  '/get-data/samlDlogsUi', 
        requestBody , 
        this.httpOptions)
        // .pipe(
        //     map((result:Array<SamlLogModel>)=>{
        //         result
        //     })
        // )
    }
    addUiLog(actionItem:string, report: string):void{
        this.httpClient.post( environment.samlSPUrl + "/insert-data/samlDlogsUi", 
        { uiAction: actionItem, report : report} , 
        this.httpOptions
        )
        .subscribe((result)=>{
            console.log("addUiLog: ", result)
        })
    }
}