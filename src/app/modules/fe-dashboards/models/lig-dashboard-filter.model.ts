import {FormControl} from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

export interface FiterControlIModel {
    filterControl : FormControl;
    filterOptionsAll: Array<string>;
    filterOptionsCurrent$: Observable<string[]>;
    filtersOptionsSelected:Array<string> | undefined;
}

export interface  FilterIModel  {
    "SALES_GROUP_NAME": BehaviorSubject<Array<string> | undefined>,
    "SALES_OFFICE_NAME": BehaviorSubject<Array<string> | undefined>,
    "sap_cc_number": BehaviorSubject<Array<string> | undefined>,
    "district": BehaviorSubject<Array<string> | undefined>,
    "PRODUCT_BRAND": BehaviorSubject<Array<string> | undefined>,
    "PRODUCT_CODE": BehaviorSubject<Array<string> | undefined>,
    "PRODUCT_NAME": BehaviorSubject<Array<string> | undefined>,
    "state": BehaviorSubject<Array<string> | undefined>,
    "taluka": BehaviorSubject<Array<string> | undefined>,
    "user_persona": BehaviorSubject<Array<string> | undefined>,
    "month":BehaviorSubject<Array<string> | undefined>,
    "FinancialYear":BehaviorSubject<Array<string> | undefined>
    [key: string]: BehaviorSubject<Array<string> |  undefined> ;
}


export interface  FilterIModel2  {
    "SALES_GROUP_NAME"?: Array<string> | undefined,
    "SALES_OFFICE_NAME"?: Array<string> | undefined,
    "sap_cc_number"?: Array<string> | undefined,
    "district"?: Array<string> | undefined,
    "PRODUCT_BRAND"?: Array<string> | undefined,
    "PRODUCT_CODE"?: Array<string> | undefined,
    "PRODUCT_NAME"?: Array<string> | undefined,
    "state"?: Array<string> | undefined,
    "taluka"?: Array<string> | undefined,
    "user_persona"?: Array<string> | undefined,
    "month":Array<string>| undefined,
    "FinancialYear":Array<string> | undefined
    [key: string]: Array<string> | undefined ;
}

export interface  FilterIModel4  {
    "SALES_GROUP_NAME": BehaviorSubject<string | undefined>,
    "SALES_OFFICE_NAME": BehaviorSubject<string | undefined>,
    "sap_cc_number": BehaviorSubject<string | undefined>,
    "district": BehaviorSubject<string | undefined>,
    "PRODUCT_BRAND": BehaviorSubject<string | undefined>,
    "PRODUCT_CODE": BehaviorSubject<string| undefined>,
    "PRODUCT_NAME": BehaviorSubject<string | undefined>,
    "state": BehaviorSubject<string | undefined>,
    "taluka": BehaviorSubject<string | undefined>,
    "user_persona": BehaviorSubject<string | undefined>,
    "month":BehaviorSubject<string | undefined>,
    "FinancialYear":BehaviorSubject<string | undefined>
    [key: string]: BehaviorSubject<string |  undefined> ;
}

export interface  FilterIModel3  {
    "SALES_GROUP_NAME"?: XFilterIModel,
    "SALES_OFFICE_NAME"?: XFilterIModel,
    "sap_cc_number"?: XFilterIModel,
    "district"?: XFilterIModel,
    "PRODUCT_BRAND"?: XFilterIModel,
    "PRODUCT_CODE"?: XFilterIModel,
    "PRODUCT_NAME"?: XFilterIModel,
    "state"?: XFilterIModel,
    "taluka"?: XFilterIModel,
    "user_persona"?: XFilterIModel,
    "month":XFilterIModel,
    "FinancialYear":XFilterIModel
    [key: string]: XFilterIModel | undefined ;
}

export interface XFilterIModel{
    latest: BehaviorSubject<Array<string> | undefined>,
    addedValue?: BehaviorSubject<string | undefined>,
    removedValue?: BehaviorSubject<string | undefined>,
}
