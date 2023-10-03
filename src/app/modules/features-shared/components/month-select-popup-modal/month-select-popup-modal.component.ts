import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from  '@angular/core';

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
  get selectedFinancialYear(): number | null{
    return this.model.selectedFinancialYear
  }
  set selectedFinancialYear(val : number | null ){
    this.model.selectedFinancialYear = val;
  }
  get selectedMonth(): number | null{
    return this.model.selectedMonth
  }
  set selectedMonth(val : number | null ){
    this.model.selectedMonth = val;
  }
  
  get dataAvailableForFinancialYears():Array<number>{
    return this.model.dataAvailableForFinancialYears
  }
  get dataAvailableForMonths():Array<number>{
    return this.model.dataAvailableForMonths
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
  public onFinacialYearSelcetChangeHandler():void{
    this.model.onFinacialYearSelcetChangeHandler()
    
  }

}