import { Pipe, PipeTransform } from '@angular/core';
import { ActivityLogDModel } from './../domain/models/activity-log.model';
import { UtilService } from './../../../core/services/util.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  constructor(private utilService : UtilService){

  }

  transform(value: ActivityLogDModel[], ...args : string[]): ActivityLogDModel[] | undefined{
    let searhPipeResult;
    if(!value){
      searhPipeResult = undefined
    }
    else if(
      !args ||
      ( args && !args[1] && !args[3] && !args[5] && !args[6] ) 
      ){
      searhPipeResult = value
    }
    else{
      searhPipeResult = value.filter((valObj:ActivityLogDModel)=>{
        return  (
          args[1]?.trim() ? 
            this.refineUserName(valObj.user).toLowerCase().includes(args[1].toLowerCase()) : true
        )&&
        (
          args[3]?.trim() ? 
            valObj.emailId.toLowerCase().includes(args[3].toLowerCase()) : true 
        )&&
        (
          (args[5]?.trim() && args[6]?.trim()) ? (()=>{
              
            let toDate  = new Date(args[6])
            let fromDate = new Date(args[5])
            fromDate.setHours(0,0,0,0)
            toDate.setHours(23,59,59) 
            return ( new Date(valObj.date) > fromDate  && new Date(valObj.date) < toDate)           
          })() : true
        )
         
      })
      
    }
    // else if(value && 
    //   (args[0]==="name" &&  args[1] && args[1] != "" ) &&
    //   (args[2]==="email" &&  ( !args[3] || args[3] === "") )
    //   ){
    //   searhPipeResult = value.filter((valObj:ActivityLogDModel)=>{
    //     return this.refineUserName(valObj.user).toLowerCase().includes(args[1].toLowerCase())
    //   })
    // }
    // else if(value &&
    //     (args[2]==="email" &&  args[3] && args[3] != "" ) &&
    //     (args[0]==="name" &&  ( !args[1] || args[1] === "") )
    //     ){
    //         searhPipeResult = value.filter((valObj:ActivityLogDModel)=>{
    //         return valObj.emailId.toLowerCase().includes(args[3].toLowerCase())
    //   })     
    // }
    // else if(value &&
    //   (args[2]==="email" &&  args[3] && args[3] != "" ) &&
    //   (args[0]==="name" &&   args[1] && args[1] != "") &&
    //   (args[5]?.trim() && args[6]?.trim())
    //   ){
    //     searhPipeResult = value.filter((valObj:ActivityLogDModel)=>{
    //     return (
    //       ( this.refineUserName(valObj.user).toLowerCase().includes(args[1].toLowerCase()) ) &&
    //       ( valObj.emailId.toLowerCase().includes(args[3].toLowerCase()) ) &&
    //       ( valObj.date > new Date(args[5])) &&
    //       ( valObj.date > new Date(args[6])) 
    //     )
    //   }) 
    // }    


    return searhPipeResult;
  }
  refineUserName(username: string):string{
    return this.utilService.refineUserName(username)
  }

}
