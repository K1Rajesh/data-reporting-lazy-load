import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Injectable, ViewChild, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";


import { MonthSelectPopupModalModel } from '../../domain/models/month-select-popup-modal.model'

@Component({
  selector: 'app-month-select-popup-modal',
  templateUrl: './month-select-popup-modal.component.html',
  styleUrls: ['./month-select-popup-modal.component.css'],
  providers: [MonthSelectPopupModalModel]
})
export class MonthSelectPopupModalComponent {
  @Input() 
  get showPopup(): boolean{
    return this.model.showPopup
  }
  set showPopup(val: boolean){
    this.model.showPopup = val
  }
  @Output() 
  get submit():EventEmitter<{fiscalYear : string | undefined ,month :string | undefined}> {
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
  public popupOpenHandler():void{
    this.model.popupOpenHandler();
  }
  public popupCloseHandler():void{
    this.model.popupCloseHandler();
  }
  public downloadClickHander():void{
    this.model.downloadClickHander();
  }

}