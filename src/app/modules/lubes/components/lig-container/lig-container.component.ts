import { Component, OnInit } from '@angular/core';

import {LigFormFilterControlService} from '../../../fe-dashboards/services/lig-form-filter-controls.service'

import {FEDashboardContainerModel} from '../../../fe-dashboards/domain/models/fe-dashboard-container.model'
import {LigDashboardModel3} from '../../../fe-dashboards/domain/models/lig-dashboard3.model'

@Component({
  selector: 'app-lig-container',
  templateUrl: './lig-container.component.html',
  styleUrls: ['./lig-container.component.css'],
  providers:[ LigFormFilterControlService, FEDashboardContainerModel, LigDashboardModel3 ]
})
export class LigContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
