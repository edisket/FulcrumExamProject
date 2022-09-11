import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { APIUtil } from '../../util/APIUtil'
@Injectable()
export class AuctionService {


    readonly API_URI: string = environment.API_BASE_URI;
    static propertyData: any[] = [];

    constructor(
        private http: HttpClient
    ) {
    }


    InitializePropertyData(){
        this.GetPropertyData().subscribe(x=>{
            AuctionService.propertyData = x;
        });
    }

    GetPropertyData(): Observable<any> {
        return this.http.get(this.API_URI + APIUtil.GET_ALL_PROPERTY_INFO);
    }
    GetBiddingProperty(): Observable<any> {
        return this.http.get(this.API_URI + APIUtil.GET_BIDDING_PROPERTY)
    }

    GetAuctionData() : Observable<any>{
        return this.http.get(this.API_URI + APIUtil.GET_AUCTION_DATA);
    }

    InsertBid(propertyId: number, biddingValue: number): Observable<any> {

        var content = {
            'propertyId': propertyId,
            'biddingValue': biddingValue
        }

        return this.http.post(this.API_URI + APIUtil.INSERT_BID, content)
    }



}