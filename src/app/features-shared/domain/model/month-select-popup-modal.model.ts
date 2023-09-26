import { Injectable } from "@angular/core";
import { EventEmitter } from  '@angular/core';

enum Month {"Jan"=0,"Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"}

@Injectable()
export class MonthSelectPopupModalModel{

    public showPopup: boolean = false;
    public submit: EventEmitter<{fiscalYear : string ,month :string}> = new EventEmitter<{fiscalYear : string ,month :string}>();
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

    public init():void{
        this.today = new Date();
        this.currentYear = this.today.getFullYear();
        this.currentMonth = this.today.getMonth();
        this.currentFinancialYear = this.getCurrentFinancialYear();
        this.dataAvailableForFinancialYears = this.getDataAvailableForFinancialYears(this.dataAvailableSinceYear, this.currentFinancialYear )
        this.dataAvailableForMonths = this.getDataAvailableForMonths();
        
    }  
    public popupOpenHandler():void{
        this.showPopup = true;
      }
      public popupCloseHandler():void{
        this.setFilterIntialVal();
        this.showPopup = false;
      }
      public downloadClickHander():void{
        this.setFilterIntialVal();
        this.showPopup = false;
        this.submit.emit({fiscalYear : "2023-2024",month :"2023-08"})
      }
    private getCurrentFinancialYear():number{
        return ((this.currentMonth >=0 && this.currentMonth <=11) && (this.currentMonth  >= this.fiscalYearStartMonth)) ? this.currentYear :  this.currentYear -1;
    }
    private getDataAvailableForFinancialYears(fromYear:number,toYear:number):Array<number>{
        return [...Array((toYear - fromYear)+1).keys()].map(i=>i+fromYear)
    }
    private getDataAvailableForMonths():Array<number>{
        if (this.selectedFinancialYear && this.selectedFinancialYear < this.currentFinancialYear){
              return [
                ...[...Array((11- this.fiscalYearStartMonth)+1).keys()].map(i=>{ 
                  return i+ this.fiscalYearStartMonth
                }) 
                ,
                ...[...Array((this.fiscalYearStartMonth - 0)).keys()].map(i=>{ 
                return i+0
                }) 
              ]
        }
        else if(this.selectedFinancialYear){
              return [
                    ...[...Array((this.currentMonth- this.fiscalYearStartMonth)+1).keys()].map(i=>{ 
                        return i+ this.fiscalYearStartMonth
                    }) 
              ]
        }
        else  return []; 
    }
    public onFinacialYearSelcetChangeHandler(element:HTMLSelectElement):void{
      this.selectedFinancialYear = element.value && parseInt(element.value) ? parseInt(element.value) :  null;
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