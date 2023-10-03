import {Injectable} from '@angular/core'
import { Router } from '@angular/router';


import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { AuthService} from '../services/auth.service'

import { AuthRespModel } from '../domain/models/auth-response.model';
import { UserDetailsModel } from '../authorized-user/domain/models/user-details.model'



@Injectable({
    providedIn: 'root'
})
export class AppModel{
    subscriptions : Array<Subscription> =[];
    intervalGetCookieSyncSPSessionTime : number | undefined;  //= 180000//environment.initialCookieCheckInterval
    sessionExpireWarningBeforeTime : number = 30000;
    constructor(private authService:AuthService,
        private router:Router, private userDetailsModel : UserDetailsModel){

    }
    init(){
        this.subscriptions = new Array<Subscription>();
        this.subscribeAuthenticatedEvent();
        this.userDetailsModel.init();
        if(!this.authService.isAuthenticated){
            this.authService.callAndSubIsAuthenticatedApi();
        } 
        
    }
    subscribeAuthenticatedEvent(){

        //Activities to be performed on successful authentication
        this.subscriptions.push(
            this.authService.userSuccessfullyAuthenticatedEvent
            .pipe(distinctUntilChanged())
            .subscribe((authResp:boolean)=>{
                if(authResp ){

                    // cookie and session managment
                    const syncSPSessionExpiresin : number | undefined = this.getCookieSyncSPSessionExpiresIn()
                    this.sessionExpiresWarning(syncSPSessionExpiresin! - this.sessionExpireWarningBeforeTime)
                    this.checkSessionTimeCookieExpired(syncSPSessionExpiresin)

                    //(may be no longer required - plan to remove)update last active at on DB
                    //this.updateSessionDataAtDB();
                    
                    
                }   
        }) 
        )
    }
    get isAuthenticated(){
        return this.authService.isAuthenticated;
    }
    checkSessionTimeCookieExpired(intervalGetCookieSyncSPSessionTime?: number):void{
        if(intervalGetCookieSyncSPSessionTime!=undefined && intervalGetCookieSyncSPSessionTime>=0){
            setTimeout(()=>{
                let syncSPSessionExpiresin = this.getCookieSyncSPSessionExpiresIn()
                    //this.intervalGetCookieSyncSPSessionTime = syncSPSessionExpiresin
                    if( syncSPSessionExpiresin && syncSPSessionExpiresin > 0){

                        this.checkSessionTimeCookieExpired(syncSPSessionExpiresin)
                    }
                    else if(syncSPSessionExpiresin && syncSPSessionExpiresin <= 0){
                        this.sessionExpired()
                    }
        
    
            },intervalGetCookieSyncSPSessionTime)    
        }
    }
    sessionExpiresWarning(warnIn?:number):void{
        if(warnIn!=undefined && warnIn >= 0){
            setTimeout(()=>{
                let syncSPSessionExpiresin = this.getCookieSyncSPSessionExpiresIn()
                let warnAt = syncSPSessionExpiresin! - this.sessionExpireWarningBeforeTime
                if( syncSPSessionExpiresin && warnAt > 0 ){
                    this.sessionExpiresWarning(warnAt) 
                }
                else if(syncSPSessionExpiresin && warnAt <= 0){
                    const sessionExpireConfirmation = window.confirm("Your session is about to expire. Do you want to continue")
                    if(sessionExpireConfirmation){
                        console.log("call to update session")
                        this.extendSession()
                        
                    }
                    else{
                        this.sessionExpired()
                    }
                }

            },warnIn)       
        }
    }
    extendSession(){
        this.authService.extendSession()
        .pipe(distinctUntilChanged())
        .subscribe((authResp : AuthRespModel)=>{
            if(authResp && authResp.authenticated){
                    // cookie and session managment
                    const syncSPSessionExpiresin : number | undefined = this.getCookieSyncSPSessionExpiresIn()
                    this.sessionExpiresWarning(syncSPSessionExpiresin! - this.sessionExpireWarningBeforeTime)
                    this.checkSessionTimeCookieExpired(syncSPSessionExpiresin)
            }

        })
    }
    getCookieSyncSPSessionExpiresIn(){
        let syncSPSessionTimeCookieValDate:Date | undefined;
        let syncSPSessionExpiresin:number | undefined
        let syncSPSessionTimeCookieRaw = document.cookie.split(";").find((cookie)=>{ 
            return cookie.trim().startsWith("syncSPSessionTime=")
        })

          if(syncSPSessionTimeCookieRaw){
            syncSPSessionTimeCookieRaw = decodeURIComponent(syncSPSessionTimeCookieRaw);
            let syncSPSessionTimeCookieValRaw =  syncSPSessionTimeCookieRaw.split('=')[1]
            const syncSPSessionTimeCookieVal = syncSPSessionTimeCookieValRaw?.substring(3,syncSPSessionTimeCookieValRaw.length-1)
            console.log("syncSPSessionTimeCookieVal",syncSPSessionTimeCookieVal)
            syncSPSessionTimeCookieValDate = new Date(syncSPSessionTimeCookieVal!)
            console.log("syncSPSessionTimeCookieValDate",syncSPSessionTimeCookieValDate)
            if(syncSPSessionTimeCookieValDate){
                const currDate = new Date()
                syncSPSessionExpiresin = syncSPSessionTimeCookieValDate.getTime() - currDate.getTime() 
                this.intervalGetCookieSyncSPSessionTime = syncSPSessionExpiresin           
            }
        }
        return syncSPSessionExpiresin;
    }
    sessionExpired(){
        //this.authService.logout()
        this.router.navigate(['/login'])
    }
    destroy(){
        this.userDetailsModel.destroy();
        this.subscriptions.forEach((sub)=>{
            sub.unsubscribe();
        })
    }
}