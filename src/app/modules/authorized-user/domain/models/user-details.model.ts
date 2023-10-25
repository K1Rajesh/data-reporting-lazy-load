import { Injectable,EventEmitter } from "@angular/core";
import { BehaviorSubject, Subscription, Observable } from "rxjs";
import { distinctUntilChanged } from 'rxjs/operators';

import { AuthService } from "../../../../services/auth.service";

export type userDetailsIModel = {
    tenantId: string,
    objectIdentifier: string,
    emailAddress: string,
    displayName: string,
    displayName2: string,
    givenName: string,
    nameID: string,
    sessionIndex: string,
    isPrivilegeUser: boolean
}

@Injectable({
    providedIn:'root'
})
export class UserDetailsModel{
    private subsList:Array<Subscription> = new Array<Subscription>();
    private _userDetails : userDetailsIModel | undefined = undefined;
    public userDetailsEvent : BehaviorSubject<userDetailsIModel| undefined> = new BehaviorSubject<userDetailsIModel| undefined>(undefined);
    public userEmail : BehaviorSubject<string[] | undefined> = new BehaviorSubject<string[] | undefined>(undefined);

    public get userDetails(): userDetailsIModel | undefined {
        return this._userDetails;
    }
    constructor(private authService:AuthService){

    }
    public init():void{
        this.subscribeAuthenticatedEvent()
    }
    public subscribeAuthenticatedEvent():void{
        this.subsList.push(
            this.authService.userSuccessfullyAuthenticatedEvent
            .pipe(distinctUntilChanged())
            .subscribe((authResp:boolean)=>{
                if(authResp ){
                    this.getUserDetails()
                }   
        }) 
        )
    }
    public getUserDetails() : void {
        this.authService.getUserDetails().subscribe((userDetails: userDetailsIModel)=>{
            this._userDetails = userDetails;
            this.userDetailsEvent.next(this.userDetails)
        })
    }
    public getUserEmailasList(): Observable<string[] | undefined>{
        this._userDetails ? this.userEmail.next([this._userDetails.nameID]) : this.userEmail.next(undefined)
        return this.userEmail.asObservable();
    }
    public destroy():void{
     this.subsList.forEach(sub=>sub.unsubscribe())   
    }
}