import { Injectable } from "@angular/core";
import { EventEmitter } from  '@angular/core';

@Injectable()
export class MonthSelectPopupModalModel{

    public showPopup: boolean = false;
    public submit: EventEmitter<{fiscalYear : string | undefined,month :string | undefined}> =
     new EventEmitter<{fiscalYear : string | undefined ,month :string | undefined}>();
    public close: EventEmitter<boolean> = new EventEmitter<boolean>();

    private today : Date;
    private currentYear : number;
    private currentMonth : number;
    public currentFinancialYear:number;
    private dataAvailableSinceYear: number = 2021;
    public dataAvailableForFinancialYears: Array<number> = new Array<number>();
    public dataAvailableForMonths: Array<number> = new Array<number>();
    public selectedFinancialYear: number | null = null;
    public selectedMonth : number | null = null;
    private fiscalYearStartMonth = 3; // April (0-based index) 
    private  dataAvailableForMonthsOtherFiscalYears: Array<number> = new Array<number>();
    private  dataAvailableForMonthsOtherCurrentFinancialYear: Array<number> = new Array<number>();

    public init():void{
        this.today = new Date();
        this.currentYear = this.today.getFullYear();
        this.currentMonth = this.today.getMonth();
        this.currentFinancialYear = this.getCurrentFinancialYear();
        this.dataAvailableForFinancialYears = this.getDataAvailableForFinancialYears(this.dataAvailableSinceYear, this.currentFinancialYear )
        this.dataAvailableForMonths = this.getDataAvailableForMonths();

        this.dataAvailableForMonthsOtherFiscalYears = [
          ...[...Array((11- this.fiscalYearStartMonth)+1).keys()].map(i=>{ 
            return i+ this.fiscalYearStartMonth
          }) 
          ,
          ...[...Array((this.fiscalYearStartMonth - 0)).keys()].map(i=>{ 
          return i+0
          }) 
        ]
       this.dataAvailableForMonthsOtherCurrentFinancialYear = [
        ...[...Array((this.currentMonth- this.fiscalYearStartMonth)+1).keys()].map(i=>{ 
            return i+ this.fiscalYearStartMonth
        }) 
        ]
        
    }  
    public popupOpenHandler():void{
        this.showPopup = true;
      }
      public popupCloseHandler():void{
        this.setFilterIntialVal();
        this.showPopup = false;
        this.close.emit(true)
      }
      public downloadClickHander():void{
        this.setFilterIntialVal();
        this.showPopup = false;
        const submittedValue = {
          fiscalYear : this.selectedFinancialYear ? this.selectedFinancialYear + "-" + this.selectedFinancialYear+1 : undefined,
          month : this.selectedMonth ? this.selectedFinancialYear + "-" + this.selectedMonth+1 : undefined
        }
        this.submit.emit(submittedValue)
      }
    private getCurrentFinancialYear():number{
        return ((this.currentMonth >=0 && this.currentMonth <=11) && (this.currentMonth  >= this.fiscalYearStartMonth)) ? this.currentYear :  this.currentYear -1;
    }
    private getDataAvailableForFinancialYears(fromYear:number,toYear:number):Array<number>{
        return [...Array((toYear - fromYear)+1).keys()].map(i=>i+fromYear)
    }
    private getDataAvailableForMonths():Array<number>{
        if (this.selectedFinancialYear && this.selectedFinancialYear < this.currentFinancialYear){
              return this.dataAvailableForMonthsOtherFiscalYears
        }
        else if(this.selectedFinancialYear){
              return this.dataAvailableForMonthsOtherCurrentFinancialYear;
        }
        else  return []; 
    }
    public onFinacialYearSelcetChangeHandler():void{
      this.setMonthFilterForSelectedYear();
    }
    public setMonthFilterIntialVal():void{
      this.selectedMonth = null;
      this.dataAvailableForMonths = [];      
    }
    public setMonthFilterForSelectedYear():void{
      this.selectedMonth = null;
      this.dataAvailableForMonths = this.getDataAvailableForMonths();
    }
    public setFilterIntialVal():void{
      this.setMonthFilterIntialVal();
      this.setYearFilterIntialVal();
    }
    public setYearFilterIntialVal():void{
      this.selectedFinancialYear = null;
    }

}