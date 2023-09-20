import { Injectable, Type } from "@angular/core"
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { environment } from '../../../environments/environment';
import { Observable, of} from 'rxjs';
//import { LastNDaysUsersDataModel } from "../models/last-n-day-users.model"
import { DistinctUserDModel } from "../domain/models/distinct-users.model";

export interface ReportsAccessedCountDModel{
    _id:string,count:number
  }

@Injectable({
    providedIn:'root'
})
export class AnalyticsLogService{
    httpOptions = {};
    constructor(private httpClient:HttpClient){
        this. httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' :'application/json'
            })  
        } 
     }

    getReportsAccessedCount(fromDate?:Date, toDate?:Date):Observable<Array<ReportsAccessedCountDModel>>{

        if(fromDate && toDate){

            //using ISO string conversion
            const params : HttpParams = new HttpParams()
            .set('fromDate',fromDate.toISOString())
            .set('toDate',toDate.toISOString())

            //using JSON  conversion
            // let params = new HttpParams();
            // params = params.append('fromDate',JSON.stringify(fromDate.toJSON()));
            // params = params.append('toDate',JSON.stringify(toDate.toJSON()));


            return this.httpClient.get<Array<ReportsAccessedCountDModel>>
            (  environment.samlSPUrl + '/reports-accessed-count', {params: params})
        }
        else{
            return this.httpClient.get<Array<ReportsAccessedCountDModel>>
            (  environment.samlSPUrl + '/reports-accessed-count')
        }


    }

    getDistinctUsers():Observable<Array<DistinctUserDModel>>{

        return this.httpClient.get<Array<DistinctUserDModel>>
        (  environment.samlSPUrl + '/get-distinct-users')


    }
    // findUsersBetweenDates(fromDate:Date,toDate:Date):Observable<Array<LastNDaysUsersDataModel>>{
    //     let queryParams = new HttpParams();
    //     fromDate.setHours(0,0,0)
    //     toDate.setHours(23,59,59)
    //     queryParams = queryParams.append('fromDate',JSON.stringify(fromDate.toJSON()));
    //     queryParams = queryParams.append('toDate',JSON.stringify(toDate.toJSON()));
    //     return this.httpClient.get<Array<LastNDaysUsersDataModel>>(
    //         environment.samlSPUrl+'/find-users-between-dates',
    //         {params:queryParams})
    // }

}