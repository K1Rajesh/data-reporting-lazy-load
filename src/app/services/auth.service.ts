import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment'
import { AuthRespModel } from './../domain/model/auth-response.model'
import { UserDetails } from './../domain/model/user-details.model'

@Injectable({
    providedIn:'root'
})
export class AuthService{
    _isAuthenticated : boolean = false;
    userSuccessfullyAuthenticatedEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private httpClient: HttpClient){

    }
    get isAuthenticated():boolean{
        //return false;//(Temp - should not be on prod) for local testing
        return this._isAuthenticated;
    }
    set isAuthenticated(authVal:boolean){
        this._isAuthenticated = authVal;
    }    
    public login(redirectUrl?:string){

        const redirectSamlSpUrl = redirectUrl ? environment.samlSPUrl+`?redirectUrl=${redirectUrl}` : environment.samlSPUrl 
        console.log("redirectSamlSpUrl: ", redirectSamlSpUrl)
        window.location.href =  redirectSamlSpUrl;
        // this.intest_subscribeSamlSPResp().subscribe((saplSPResp:any)=>{
        //     console.log("test saml resp",saplSPResp)
        // });

    }
    public logout(){
        window.location.href = environment.samlSPUrl + "/logout";
    }
    public getUserDetails():Observable <UserDetails> {
        return this.httpClient.get<UserDetails>(environment.samlSPUrl+"/getUserDetails")
    
    }
    // public intest_subscribeSamlSPResp():Observable<{string:boolean}>{
    //     return this.httpClient.get<{string:boolean}>(
    //         environment.samlSPUrl
    //     );
    // }
    public callAndSubIsAuthenticatedApi(){
        console.log("At callAndSubIsAuthenticatedApi func")
        this.httpClient.get<AuthRespModel>(
            environment.samlSPUrl + "/isAuthenticated", {observe: 'response'}
        ).subscribe((httpResponse: HttpResponse<AuthRespModel>)=>{
            if(httpResponse.status >= 200  && httpResponse.status < 300){
                const authResp = httpResponse.body
                console.log("authResp: ",authResp);
                if(authResp){
                    this.isAuthenticated = authResp.authenticated; 
                    this.userSuccessfullyAuthenticatedEvent.next(this.isAuthenticated );
                }
            }
            else if(httpResponse.status >= 300 && httpResponse.status < 400){
                const newLocation = httpResponse.headers.get('Location');
                window.location.href = newLocation!
            }
            else{
                console.log(`Request failed with status code ${httpResponse.status}`)
            }

        });
    } 
    public callAuthenticatedApi():Observable<AuthRespModel>{
        console.log("At callAuthenticatedApi func")
        return this.httpClient.get<AuthRespModel>(
            environment.samlSPUrl + "/isAuthenticated",
        )
    }      
    public extendSession():Observable<AuthRespModel>{
        return this.httpClient.get<AuthRespModel>(
            environment.samlSPUrl + "/extend-session",
        )
    }   
}
