import {Injectable} from '@angular/core'
import { BehaviorSubject, Observable, Subscription, combineLatest, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators'

import { FELigDataService } from './../../services/fe-lig-data.service';
import { LigFormFilterControlService3 } from '../../services/lig-form-filter-controls-3.service';


import { UserIModel,LigDataRequestIModel, LigDataFilterIModel } from '../../models/api/lig-data-request.model';
import { LigDataResponseIModel } from '../../models/api/lig-data-reponse.model';

import { UserDetailsModel } from '../../../authorized-user/domain/models/user-details.model';

import { UserDetailsIModel } from '../../../features-shared/domain/models/user-details.model';

@Injectable()
export class LigDataModel{
    private ligFilterResponseBehaviorSubject: BehaviorSubject<LigDataResponseIModel | undefined> = new BehaviorSubject<LigDataResponseIModel | undefined>(undefined);
    private ligDataResponseBehaviorSubject: BehaviorSubject<LigDataResponseIModel | undefined> = new BehaviorSubject<LigDataResponseIModel | undefined>(undefined) ;
    // public ligFilterResponse$: Observable<LigDataResponseIModel | undefined>;
    // public ligDataResponse$: Observable<LigDataResponseIModel | undefined>;
    private subsList : Array<Subscription> = new  Array<Subscription>();
    private emailId: string | undefined;
    public filtersAvailable : Array<string> = [
        'FinancialYear',
        'month',
        'sap_cc_number',
        'user_persona',
        'SALES_GROUP_NAME' ,
        'SALES_OFFICE_NAME',
        'taluka',
        'district',
        'state',
        'PRODUCT_CODE',
        'PRODUCT_NAME',
        'PRODUCT_BRAND',
    ]
    private filters:LigDataFilterIModel={month:[], FinancialYear:[]};
    private payload:LigDataRequestIModel;
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
                    this.ligFilterResponseBehaviorSubject.next(undefined)
                    this.feLigDataService.getLigData(payload)
                    .subscribe(
                        (response:LigDataResponseIModel)=>{
                            this.ligFilterResponseBehaviorSubject.next(response)
                        },
                        (error:any) => {
                            this.ligFilterResponseBehaviorSubject.error(error)
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
                    this.feLigDataService.getLigData(payload)
                    .subscribe(
                        (response:LigDataResponseIModel)=>{
                            this.ligDataResponseBehaviorSubject.next(response)
                        },
                        (error:any) => {
                            this.ligDataResponseBehaviorSubject.error(error)
                        },
                        ()=>{
                            //this.ligDataResponseBehaviorSubject.complete()   
                        }     
                    )
                }
            }
        })
    }
    public getLigFilterResponse(): Observable<LigDataResponseIModel | undefined>{
        return this.ligFilterResponseBehaviorSubject.asObservable()
    }
    public getLigDataResponse():Observable<LigDataResponseIModel | undefined>{
        return this.ligDataResponseBehaviorSubject.asObservable()
    }
    private getUser():UserIModel{
        //(temp dummyUser)
        return  {
            "email":  "z_act_dev3@corp.bharatpetroleum.com"//"abhisekdatta@corp.bharatpetroleum.com" , // "sonawaneug@corp.bharatpetroleum.com",
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