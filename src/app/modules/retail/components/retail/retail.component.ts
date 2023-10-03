import { Component, OnInit } from '@angular/core';

import { CONST_VALUES } from './../../../../core/constant-reources'

import { RetailModel } from '../../models/retail.model';
import { UfillModel } from '../../models/ufill.model';

import { SideNavModel } from '../../../features-shared/models/side-nav.model';
import { SideNavService } from './../../../features-shared/services/side-nav.service'


import { ConfigService } from './../../../features-shared//services/config.service';


@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./../../../../app.component.css','./retail.component.css'],
  providers: [SideNavModel,UfillModel,SideNavService]
})
export class RetailComponent implements OnInit {

  get showChild() : boolean{
    return this.retailModel.showChild
  }
  featureName : string  = CONST_VALUES.FEATURES.RETAIL;
  constructor(private retailModel:RetailModel, private sideNavModel:SideNavModel,
    private configService:ConfigService ){
    console.log("At Retail constructor");
  }
  ngOnInit(): void {
    console.log("At Retail ngOnInit");
    this.configService.init()
    this.retailModel.init();
  }
  get toggleSideNavVal():boolean{
    return this.sideNavModel.showSideNav
  }

}
