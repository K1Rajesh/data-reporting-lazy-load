import { Injectable  } from "@angular/core"
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Observable, of} from 'rxjs';


import { environment } from '../../../../environments/environment';
import { LigDataRequestIModel, SAMPLE_LIG_DATA_REQUEST } from '../models/api/lig-data-request.model'
import { LigDataResponseIModel } from '../models/api/lig-data-reponse.model';





@Injectable({
    providedIn:'root'
})
export class FELigDataService{
    httpOptions = {};
    constructor(private httpClient:HttpClient){
        this. httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' :'application/json'
            })  
        } 
    }

    public getLigData(payLoad?:LigDataRequestIModel):Observable<LigDataResponseIModel>{

        const dummyPayLoad  = SAMPLE_LIG_DATA_REQUEST
        return this.httpClient.post<any>("http://10.29.2.4:8001/pukipy/lig_data222", payLoad )
    }



}