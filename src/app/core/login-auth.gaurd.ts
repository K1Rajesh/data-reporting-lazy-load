// import { Injectable } from '@angular/core'
// import { CanActivate, Route, Router } from '@angular/router';
// import {AuthService} from './../services/auth.service';
// @Injectable({
//     providedIn: 'root'
// })
// export class LoginAuthGaurd implements CanActivate{
//     constructor(private authService: AuthService, private router: Router){

//     }
//     canActivate(): boolean{
//         if(this.authService && !this.authService.isAuthenticated){
//             return true; 
//         }else{
//             this.router.navigate(["/home"])
//         }

//         return true;   
//     }
// }