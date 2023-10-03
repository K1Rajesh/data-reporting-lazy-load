import { Injectable  } from "@angular/core"
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { environment } from './../../../environments/environment';
import { Observable, of} from 'rxjs';
import { LigDataResponseModel } from '../models/api/lig-data-response.model'




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
    public getLigData(ligDataReqPayLoad:{"email": string,"month":string}):Observable<LigDataResponseModel>{
        return this.httpClient.post<LigDataResponseModel>(environment.pukipy + "lig_data1",ligDataReqPayLoad)

    }



}