import { Injectable } from "@angular/core";
import data from '../../../assets/json/data.json';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {APIUtil} from '../../util/APIUtil'
@Injectable()
export class AuctionService {


    readonly API_URI: string = environment.API_BASE_URI;
    static propertyData: any[] = data;

    constructor(
        private http:HttpClient
    ) {
    }


    Initialize(){

    }
    
    GetPropertyData():Observable<any> { 
        return this.http.get(this.API_URI + APIUtil.GET_ALL_PROPERTY_INFO);
    }


    GetBiddingData() { }

    GetAuctioNData(){
        return this.http.get(this.API_URI + APIUtil.GET_AUCTION_DATA);
    }



}