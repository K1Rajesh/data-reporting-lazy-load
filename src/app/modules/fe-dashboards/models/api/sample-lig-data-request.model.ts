import { LigDataRequestIModel } from './lig-data-request.model';

export const MOCK_LIG_DATA_REQUEST: LigDataRequestIModel = {
  "user": {
    "email": "anushigupta@corp.bharatpetroleum.com"
  },
  "provideData":true,
  "filters": {
    "month": "2023-08",
    'FinancialYear':'2023-2024',
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
