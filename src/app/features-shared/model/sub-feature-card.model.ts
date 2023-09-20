import { Injectable } from "@angular/core";
import { SubFeatureCardDModel } from "../domain/model/sub-feature-card-model";
import { SideNavModel } from "../model/side-nav.model"

@Injectable()
export class SubFeatureCardModel{
  url:any = undefined;
  subFeatureCards : Array<SubFeatureCardDModel>;
  featureName: string;
  constructor(
     private sideNavModel:SideNavModel){

  }
  init(){
    this.intializeProp();
    this.setSubFeatureCards(); 
     
  }
  setSubFeatureCards(){
    switch(this.featureName){
        case "retail" : {
            this.subFeatureCards = RetailSubFeatureCards;
            break;
        }
        case "lubes" : {
            this.subFeatureCards = LubesSubFeatureCards;
            break;
        } 
    }
  }
  public selectSubFeature(cardName:string){
    this.sideNavModel.selectSideNavItem(cardName)
  }
  public destroy(): void{
    this.intializeProp();
  }
  public intializeProp(){
    this.subFeatureCards = [];
  }
}


export const RetailSubFeatureCards: Array<SubFeatureCardDModel> = [
    {
        iconPath: "./assets/ufill_0310.png",
        cardName: "UFill",
        cardDescription: "Fast forward your fill"
    }
]

export const LubesSubFeatureCards: Array<SubFeatureCardDModel> = [
    {
        iconPath: "./assets/lig_logo_0904.png",
        cardName: "Lig",
        cardDescription: "TBA"
    }
]