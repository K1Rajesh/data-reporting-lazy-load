import { Component, OnInit } from '@angular/core';

import { CONST_VALUES } from './../../../core/constant-reources'

import { LubesModel } from '../../models/lubes.model';
import { LigModel } from '../../models/lig.model';

import { SideNavModel } from '../../../features-shared/models/side-nav.model';
import { SideNavService } from './../../../features-shared/services/side-nav.service'


import { ConfigService } from './../../../features-shared//services/config.service';


@Component({
  selector: 'app-lubes',
  templateUrl: './lubes.component.html',
  styleUrls: ['./../../../app.component.css','./lubes.component.css'],
  providers: [SideNavModel,LigModel,SideNavService]
})
export class LubesComponent implements OnInit {
  get showChild() : boolean{
    return this.lubesModel.showChild
  }
  featureName : string  = CONST_VALUES.FEATURES.Lubes;
  constructor(
    private lubesModel:LubesModel, private sideNavModel:SideNavModel,
    private configService:ConfigService){
    console.log("At Lubes constructor");
  }
  ngOnInit(): void {
    console.log("At Lubes ngOnInit");
    this.configService.init()
    this.lubesModel.init();
  }
  get toggleSideNavVal():boolean{
    return this.sideNavModel.showSideNav
  }
}
