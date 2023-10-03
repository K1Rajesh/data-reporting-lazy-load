import { Injectable } from "@angular/core";
import { FeatureCardModel } from '../domain/models/feature-card-model';
import { sampleFeatureCards } from '../domain/models/feature-card-model';
import {Subscription} from 'rxjs'
@Injectable({
    providedIn: 'root'
})
export class DivisionsModel{

    featureCardsList : Array<string>;
    _featureCards: Array<FeatureCardModel>;
    sampleFeatureCards: Array<FeatureCardModel>;
    getFeatureCardsDashboardSubscription: Subscription;
    constructor() {
  
     }
    get featureCards(): Array<FeatureCardModel>{
      return this._featureCards;
    }
    public init(): void {
      this._featureCards = sampleFeatureCards;
     }

}
