import { Component } from '@angular/core';

@Component({
  selector: 'app-top-nav-home',
  templateUrl: './top-nav-home.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavHomeComponent  {
  logoPath:string = "../assets/bpcl-logo_60x85.jpg";

  constructor() { }
  
  onAcoeLogoClick(){
    this.openAcoePage();
  }
  public openAcoePage():void{
    var acoeLink = "https://analytics.bpcl.co.in/adfs/extensions/OverviewMashup/OverviewMashup.html?userid=";
    window.open(acoeLink,'_blank')
  }
}
