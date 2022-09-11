import { Injectable } from "@angular/core";
import data from '../../../assets/json/data.json';


@Injectable()
export class AuctionService {




    propertyData: any[] = data;


    constructor() {

        console.log(this.propertyData);
    }



    GetPropertyData(){}
    GetBiddingData(){}


    
}