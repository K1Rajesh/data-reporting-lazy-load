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
        const ligDataUrl  = environment.pukipy + "lig_data222"
        return this.httpClient.post<any>( ligDataUrl, payLoad )
    }



}