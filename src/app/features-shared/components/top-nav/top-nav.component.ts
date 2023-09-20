import { Component, OnInit } from '@angular/core';
import { SideNavService } from './../../services/side-nav.service'


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  logoPath:string = "../assets/bpcl-logo_60x85.jpg";
  get _toggleSideNavVal():boolean{
    return this.sideNavService.showSideNav;
  }
  constructor( private sideNavService: SideNavService) { }

  ngOnInit(): void {
    console.log("At TopNavComponent ngOnInit");

  }
  onAcoeLogoClick(){
    this.openAcoePage();
  }
  public openAcoePage():void{
    var acoeLink = "https://analytics.bpcl.co.in/adfs/extensions/OverviewMashup/OverviewMashup.html?userid=";
    window.open(acoeLink,'_blank')
  }
  toggleSideNav(){
    this.sideNavService.setShowSideNav(!this._toggleSideNavVal)
  }

}
