import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  readonly bpclLogo: any = "../assets/bpcl-logo_60x85.png"
  constructor( private authService : AuthService, private activatedRoute:ActivatedRoute) { 

  }
  ngOnInit(): void {
    console.log("At LoginComponent ngOnInit");
    this.subscribeRouteParams()
  }
  login(){
    this.authService.login();
  }
  subscribeRouteParams(){
    this.activatedRoute.queryParams.subscribe((queryParams)=>{
      console.log("At subscribeRouteParams queryParams: ",queryParams)
      if(queryParams){
        const redirectUrl = queryParams['redirectUrl']!
        if(redirectUrl && redirectUrl!=="/home"){
          this.authService.login(redirectUrl);
        } 
      }
    })     
  }

}
