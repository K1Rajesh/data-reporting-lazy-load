import { Injectable } from '@angular/core';


@Injectable({providedIn:'root'})
export class LigCsvDownloadService{
    private downloadFileName = "lig-report.csv";
    constructor(){
        
    }
        ngOnInit() {
          
        }
            
        downloadFile(data:any, csvHeaders:Array<string>,newHeaderMapping:Map<string,string>) {
          let csvData = this.ConvertToCSV(data, csvHeaders,newHeaderMapping);
          console.log(csvData)
          let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
          let dwldLink = document.createElement("a");
          let url = URL.createObjectURL(blob);
          let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
          if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
          }
          dwldLink.setAttribute("href", url);
          dwldLink.setAttribute("download", this.downloadFileName);
          dwldLink.style.visibility = "hidden";
          document.body.appendChild(dwldLink);
          dwldLink.click();
          document.body.removeChild(dwldLink);
        }
      
        ConvertToCSV(objArray:any, headerList:Array<string>,newHeaderMapping:Map<string,string>) {
          //console.log(objArray);
          //console.log(headerList);
          let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
          let str = '';
          let row = 'S.No,';
            
          for (let index in headerList) {
            row += newHeaderMapping.get(headerList[index]) + ',';
          }
          row = row.slice(0, -1);
          str += row + '\r\n';
          for (let i = 0; i < array.length; i++) {
            let line = (i + 1) + '';
            for (let index in headerList) {
              let head = headerList[index];
      
              line += ',' + this.strRep(array[i][head]);
            }
            str += line + '\r\n';
          }
          return str;
        }
      
        strRep(data:any) {
          if(typeof data == "string") {
            let newData = data.replace(/,/g, " ");
             return newData;
          }
          else if(typeof data == "undefined") {
            return "-";
          }
          else if(typeof data == "number") {
            return  data.toString();
          }
          else {
            return data;
          }
        }
}