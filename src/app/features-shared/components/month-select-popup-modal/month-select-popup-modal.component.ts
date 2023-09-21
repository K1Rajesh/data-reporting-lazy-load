import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from  '@angular/core';

@Component({
  selector: 'app-month-select-popup-modal',
  templateUrl: './month-select-popup-modal.component.html',
  styleUrls: ['./month-select-popup-modal.component.css']
})
export class MonthSelectPopupModalComponent {
  @Input() showPopup: boolean = false;
  @Output() submit: EventEmitter<{fiscalYear : string ,month :string}> = new EventEmitter<{fiscalYear : string ,month :string}>();
  constructor() { }

  public popupOpenHandler():void{
    this.showPopup = true;
  }
  public popupCloseHandler():void{
    this.showPopup = false;
  }
  public downloadClickHander():void{
    this.showPopup = false;
    this.submit.emit({fiscalYear : "2023-2024",month :"2023-08"})
  }

}