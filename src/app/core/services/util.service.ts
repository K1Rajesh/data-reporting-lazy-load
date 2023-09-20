import { Injectable} from '@angular/core';


@Injectable({
    providedIn : 'root'
})
export class UtilService{
    public refineUserName(username: string):string{
        // var matches = username.match(/\((.*?)\)/)
        // return matches ? matches[1] : ""
        let indexOfBrace = username.indexOf("(") 
        let indexOfLength = username.length
        return username.substring(0, indexOfBrace ? indexOfBrace : indexOfLength)
    }
    public sortObjByFooStringProp(fieldName:string,data:any[],sortOrder:string):any[]{
        const dataCopy = JSON.parse(JSON.stringify(data))
        if(!dataCopy || dataCopy.length < 1){
            return dataCopy;
        }
        return dataCopy.sort((obj_1:any|undefined,obj_2:any|undefined)=>{
            if(obj_1![fieldName]!.toLocaleLowerCase() > obj_2![fieldName]!.toLocaleLowerCase() ){
                return sortOrder==="desc" ?  -1 : 1
            }
            else if(obj_1![fieldName]!.toLocaleLowerCase()  < obj_2![fieldName]!.toLocaleLowerCase() ){
                return sortOrder==="desc" ? 1 : -1
            }
            return 0
        })
    }
}