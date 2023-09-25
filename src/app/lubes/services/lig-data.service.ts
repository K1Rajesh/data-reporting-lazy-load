import { Injectable  } from "@angular/core"
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { environment } from './../../../environments/environment';
import { Observable, of} from 'rxjs';
import { LigDashboardDataModel } from '../model/lig-dashboard-data.model'




@Injectable({
    providedIn:'root'
})
export class LigDataService{
    httpOptions = {};
    constructor(private httpClient:HttpClient){
        this. httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' :'application/json'
            })  
        } 
    }
    //userEmailId:string,duration: {fiscalYear : string ,month :string}
    public getLigData(ligDataReqPayLoad:{"email": string,"month":string}):Observable<LigDashboardDataModel>{
        return this.httpClient.post<LigDashboardDataModel>(environment.pukipy + "lig_data1",ligDataReqPayLoad)

    }



}