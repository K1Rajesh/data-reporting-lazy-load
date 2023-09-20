import {Injectable} from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, Route, UrlSegment, NavigationExtras } from '@angular/router';
import {AuthService} from './../services/auth.service';
import { Observable,of } from 'rxjs';
import { map,catchError,take, tap } from 'rxjs/operators';
import { AuthRespModel } from './../domain/model/auth-response.model';

@Injectable({
    providedIn: 'root'
})
export class AuthGaurd implements CanActivate{
    constructor(
        private authService:  AuthService,
        private router : Router
    ){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):Observable<boolean>{
        return of(true);//(Temp - should not be on prod) for local testing
        let isAuthenticated:boolean = false;
        return  this.authService.callAuthenticatedApi().
         pipe(
            map(
                (authResp:AuthRespModel)=>{
 

                    if(authResp && !authResp.authenticated) {
                        //this.saveCurrentPathCookie(state.url);
                        this.navigateToLogin(state.url);

 
                        return false
                    }

                    return authResp && authResp.authenticated ? true: false
                }
            ),
            tap((authGaurdVal)=>{
                console.log("authGaurdVal",authGaurdVal);
            }),
            catchError((err:any)=>{
                //this.saveCurrentPathCookie(state.url);
                this.navigateToLogin(state.url);
                return of(false)
            })  
         )         
    }

    public saveCurrentPathCookie(currentPath:string):void{
        console.log("At saveCurrentPathCookie func");
        console.log("currentPath: ", currentPath);
        document.cookie = `currentPath=${currentPath}; path=/`
    }
    public navigateToLogin(redirectUrl:string):void{

        const navigationExtras: NavigationExtras ={
            queryParams:{redirectUrl : redirectUrl},
            //state:{redirectUrl : redirectUrl}
        }
        console.log(" At navigateToLogin redirectUrl: ",redirectUrl)
        this.router.navigate(["/login"],navigationExtras);
    }


}