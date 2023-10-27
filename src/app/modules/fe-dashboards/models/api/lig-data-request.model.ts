import { MOCK_LIG_DATA_REQUEST } from './sample-lig-data-request.model'
export type LigDataRequestIModel = { 
    "user": UserIModel,
    "filters": LigDataFilterIModel,
    "provideData" :boolean
};

export interface UserIModel {
  "email": string
}
  

export interface LigDataFilterIModel {
  "month": Array<string>,
  "FinancialYear":Array<string>,
  "user_persona"? : Array<string>,
  "taluka"? : Array<string>,
  "sap_cc_number"? : Array<string>,
  "SALES_GROUP_NAME"? : Array<string>,
  "SALES_OFFICE_NAME"?: Array<string>,
  "state"?: Array<string>,
  "district"?: Array<string>,
  "PRODUCT_NAME"?: Array<string>,
  "PRODUCT_CODE"?: Array<string>,
  "PRODUCT_BRAND"?: Array<string>,
  [key: string]: Array<string> | undefined;
}


export const SAMPLE_LIG_DATA_REQUEST: LigDataRequestIModel = {
  "user": {
    "email": "anushigupta@corp.bharatpetroleum.com"
  },
  "provideData":true,
  "filters": {
    "month": ["2023-08"],
    'FinancialYear':['2023-2024'],
    "user_persona": ["lubes_personalvehicleowner"],
    "taluka": ["Kesinga"],
    "sap_cc_number": ["117606.0"],
    "SALES_GROUP_NAME": ["Rourkela Lubes"],
    "SALES_OFFICE_NAME": ["Mumbai Territory"],
    "state": ["Maharashtra"],
    "district": ["MUMBAI"],
    "PRODUCT_NAME": ["MAK 4T Plus (SL 20W-40) 1 lt X 12"],
    "PRODUCT_CODE": ["7265857"],
    "PRODUCT_BRAND": ["4 T PLUS"]
    
  }
}