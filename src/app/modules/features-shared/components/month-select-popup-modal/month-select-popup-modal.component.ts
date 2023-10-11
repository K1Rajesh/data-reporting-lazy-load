import { Component, Input, OnInit, Output, EventEmitter, OnDestroy,
OnChanges, SimpleChanges } from '@angular/core';
import { ViewChild, ViewContainerRef } from "@angular/core";


import { MonthSelectPopupModalModel } from '../../domain/models/month-select-popup-modal.model';
import { LigDataFilterIModel } from "../../../fe-dashboards/models/api/lig-data-request.model";


@Component({
  selector: 'app-month-select-popup-modal',
  templateUrl: './month-select-popup-modal.component.html',
  styleUrls: ['./month-select-popup-modal.component.css'],
  providers: [MonthSelectPopupModalModel]
})
export class MonthSelectPopupModalComponent implements OnInit, OnChanges , OnDestroy {
  @Input() 
  get showPopup(): boolean{
    return this.model.showPopup
  }
  set showPopup(val: boolean){
    this.model.showPopup = val
  }
  @Output() 
  get submit():EventEmitter<LigDataFilterIModel> {
    return this.model.submit;
  }
  @Output() 
  get close():EventEmitter<boolean> {
    return this.model.close;
  }
  @ViewChild('feDashboardFilterContainer', { read: ViewContainerRef, static: true }) 
  get feDashboardFilterContainer(): ViewContainerRef{
    return this.model.feDashboardFilterContainer;
  }
  set feDashboardFilterContainer(val: ViewContainerRef){
    this.model.feDashboardFilterContainer = val;
  }

  constructor(private model : MonthSelectPopupModalModel) { 

  }
  ngOnInit():void{
    this.model.init();
  }
  ngOnChanges(changes: SimpleChanges):void {
    if(changes.showPopup){
      this.model.unLoadFELigDashboardFilterComponent();
      this.model.loadFELigDashboardFilterComponent()
    }
    else{
      this.model.unLoadFELigDashboardFilterComponent();
    } 
  }
  public popupOpenHandler():void{
    this.model.popupOpenHandler();
  }
  public popupCloseHandler():void{
    this.model.popupCloseHandler();
  }
  public downloadClickHander():void{
    this.model.downloadClickHander();
  }
  ngOnDestroy():void{
    this.model.destroy();
  }

}