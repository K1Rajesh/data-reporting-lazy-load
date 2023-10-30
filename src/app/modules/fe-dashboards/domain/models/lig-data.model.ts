import {Injectable} from '@angular/core'
import { BehaviorSubject, Observable, Subscription, combineLatest, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators'

import { FELigDataService } from './../../services/fe-lig-data.service';
import { LigFormFilterControlService3 } from '../../services/lig-form-filter-controls-3.service';


import { UserIModel, LigDataFilterIModel } from '../../models/api/lig-data-request.model';
import { LigDataResponseIModel, LigDataApiResponseIModel } from '../../models/api/lig-data-reponse.model';
import { FilterIModel2 } from '../../models/lig-dashboard-filter.model';

import { UserDetailsModel } from '../../../authorized-user/domain/models/user-details.model';

import { FiltersAvailable } from './available-filters.model'

@Injectable()
export class LigDataModel{
    private ligFilterResponseBehaviorSubject: BehaviorSubject<LigDataApiResponseIModel | undefined> = new BehaviorSubject<LigDataApiResponseIModel | undefined>(undefined);
    private ligDataResponseBehaviorSubject: BehaviorSubject<LigDataApiResponseIModel | undefined> = new BehaviorSubject<LigDataApiResponseIModel | undefined>(undefined) ;
    private appliedFilterOnInitLigDataCall: BehaviorSubject<FilterIModel2 | undefined> = new BehaviorSubject<FilterIModel2 | undefined>(undefined) ;

    private subsList : Array<Subscription> = new  Array<Subscription>();
    private emailId: string | undefined;
    public filtersAvailable : Array<string> = FiltersAvailable;
    private filters:LigDataFilterIModel={month:[], FinancialYear:[]};
    private payLoadEle$: Array<Observable<string[] | undefined>> = new Array<Observable<string[] | undefined>>();

    constructor(private feLigDataService: FELigDataService,
        private userDetailsModel : UserDetailsModel,
        private ligFormFilterControlService3 : LigFormFilterControlService3){};

    init(){


    }
    public initLigFilterCall(provideData:boolean){

        this.payLoadEle$  = new Array<Observable<string[] | undefined>>();
        this.addUserDetailsToSubscribe();
        this.addFiltersToSubscribe();     
        
        combineLatest(this.payLoadEle$)
        .pipe(take(1))
        .subscribe((ele )=>{
            if(ele && ele.length > 0){
                this.emailId = ele[0] && ele[0][0];
                const filterElements = ele.slice(1,ele.length)
                filterElements.forEach((ele,index)=>{
                    this.filters[this.filtersAvailable[index]] = ele
                })
    
                const payload = {
                    user: this.getUser(),
                    filters: this.filters,
                    provideData:provideData
        
                }
                if(this.validLigDataCall()){

                    const tempLigApiResponse : LigDataApiResponseIModel = { data : undefined , isLoading: true, isSuccess:false  }
                    this.ligFilterResponseBehaviorSubject.next(tempLigApiResponse)

                    this.feLigDataService.getLigData(payload)
                    .subscribe(
                        (response:LigDataResponseIModel)=>{
                            const tempLigApiResponse : LigDataApiResponseIModel = { data : response , isLoading: false, isSuccess:response.success  }
                            this.ligFilterResponseBehaviorSubject.next(tempLigApiResponse)
                        },
                        (error:any) => {
                            const tempLigApiResponse : LigDataApiResponseIModel = { 
                                data : undefined, 
                                isLoading: false, 
                                isSuccess:false , 
                                errorMessage:error
                            }
                            this.ligFilterResponseBehaviorSubject.error(tempLigApiResponse)
                        },
                        ()=>{
                            //this.ligFilterResponseBehaviorSubject.complete()   
                        }     
                    )
                }
            }
        })
    }
    public initLigDataCall(provideData:boolean){
        this.payLoadEle$  = new Array<Observable<string[] | undefined>>();
        this.addUserDetailsToSubscribe();
        this.addFiltersToSubscribe();     
        
        combineLatest(this.payLoadEle$)
        .pipe(take(1))
        .subscribe((ele )=>{
            if(ele && ele.length > 0){
                this.emailId = ele[0] && ele[0][0];
                const filterElements = ele.slice(1,ele.length)
                filterElements.forEach((ele,index)=>{
                    this.filters[this.filtersAvailable[index]] = ele
                })
    
                const payload = {
                    user: this.getUser(),
                    filters: this.filters,
                    provideData:provideData
        
                }
                if(this.validLigDataCall()){
                    this.appliedFilterOnInitLigDataCall.next(this.filters);
                    const tempLigApiResponse : LigDataApiResponseIModel = { data : undefined , isLoading: true, isSuccess:false  }
                    this.ligDataResponseBehaviorSubject.next(tempLigApiResponse)

                    this.feLigDataService.getLigData(payload)
                    .subscribe(
                        (response:LigDataResponseIModel)=>{
                            const tempLigApiResponse : LigDataApiResponseIModel = { data : response , isLoading: false, isSuccess:response.success  }
                            this.ligDataResponseBehaviorSubject.next(tempLigApiResponse)
                        },
                        (error:any) => {
                            const tempLigApiResponse : LigDataApiResponseIModel = { 
                                data : undefined, 
                                isLoading: false, 
                                isSuccess:false , 
                                errorMessage:error
                            }
                            this.ligDataResponseBehaviorSubject.error(tempLigApiResponse)
                        },
                        ()=>{
                            //this.ligDataResponseBehaviorSubject.complete()   
                        }     
                    )
                }
            }
        })
    }
    public getLigFilterResponse(): Observable<LigDataApiResponseIModel | undefined>{
        return this.ligFilterResponseBehaviorSubject.asObservable()
    }
    public getLigDataResponse():Observable<LigDataApiResponseIModel | undefined>{
        return this.ligDataResponseBehaviorSubject.asObservable()
    }
    public getAppliedFilterOnInitLigDataCall():Observable<FilterIModel2 | undefined> {
        return this.appliedFilterOnInitLigDataCall.asObservable();
    }

    private getUser():UserIModel{
        //(temp dummyUser)
            //murarijha - mumbai,  anushigupta - all, ashutoshpandy, arushjain
            //"abhisekdatta - bhubaneswar , kastalasaisiddh -SEC , sonawaneug@corp.bharatpetroleum.com",
        return  {
            "email":  "sonawaneug@corp.bharatpetroleum.com"
        }; 
        // return {
        //     "email": this.emailId!
        // }
        

    }
    private validLigDataCall(){
        return (this.filters && this.filters.month?.length >0 && this.filters.FinancialYear?.length > 0 )
    }

    private addUserDetailsToSubscribe(){
        this.payLoadEle$.push(
            this.userDetailsModel.getUserEmailasList()
        )

    }
    private addFiltersToSubscribe(){
        this.filtersAvailable.forEach(filter=>{
            this.payLoadEle$.push(
                this.ligFormFilterControlService3.getSelectedFilterLatestEle(filter)
            )
        })
    }
    
    destroy(){
        this.subsList.forEach((sub)=>sub.unsubscribe());
    }
}



        
        // Object.entries(this.ligFormFilterControlService2.selectedFilters)
        // .filter(([key,value])=>{
        //     return value!==undefined
        // })

            // private getFilters():LigDataFilterIModel{
    //     const serviceSelectedFilters = this.ligFormFilterControlService3.selectedFilters
    //     let validSelectedFilters:LigDataFilterIModel = {
    //         month : serviceSelectedFilters.month!,
    //         FinancialYear: serviceSelectedFilters.FinancialYear!
    //     }
    //     Object.keys(serviceSelectedFilters).forEach(key => {
    //         validSelectedFilters[key] = serviceSelectedFilters[key];
    //     });
    //     return validSelectedFilters
    // }