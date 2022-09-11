import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin, interval, startWith, switchMap } from "rxjs";
import { AuctionData } from "src/app/model/AuctionData";
import { BiddingData } from "src/app/model/BiddingData";
import { AuctionService } from "../../services/auction.service";

@Component({
    selector: 'auction-component',
    templateUrl: './auction.component.html',
    styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {

    @ViewChild("DepositField") depositField: ElementRef;


    selectedIndex: number = 0;
    selectedProperty: any;
    depositValue: string = "";
    propertyList: any[] = [];
    biddingData: BiddingData[] = []
    auctionData: AuctionData = {};
    isDisplayImage: boolean = true;


    constructor(
        private auctionService: AuctionService,
        private route: ActivatedRoute
    ) {
        this.propertyList = AuctionService.propertyData;
        this.selectedProperty = this.propertyList[this.selectedIndex];
    }

    ngOnInit(): void {

        interval(5000)
            .pipe(
                startWith(0),

                switchMap(() => forkJoin({
                    result1: this.auctionService.GetAuctionData(),
                    result2: this.auctionService.GetBiddingProperty()
                })
                )

            )
            .subscribe(res => {

                this.auctionData = <any>res['result1'][0];
                this.biddingData = <any>res['result2'];
            });

    }

    OnDisplayImage(event: any) {

        this.isDisplayImage = !this.isDisplayImage;
    }

    OnNext() {
        this.selectedIndex++;
        if (this.propertyList.length > 0) {

            if (this.selectedIndex >= this.propertyList.length) {
                this.selectedIndex = 0;
            }

            this.selectedProperty = this.propertyList[this.selectedIndex];
        }
    }

    OnPrevious() {

        this.selectedIndex--;
        if (this.propertyList.length > 0) {
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.propertyList.length - 1;

            }
            this.selectedProperty = this.propertyList[this.selectedIndex];

        }

    }

    GetCurrentValue(propertyId: any) {
        let data = this.biddingData.find(x => x.PROPERTY_ID == propertyId)?.WINNING_BID
        return data ? data : 0;
    }
    GetDiffValue(propertyId: any) {
        let data = this.biddingData.find(x => x.PROPERTY_ID == propertyId)?.DIFF
        return data ? data : 0;
    }

    OnBid() {
        let val = Number(this.depositValue);

        if (val > 0) {

            if (val > this.GetCurrentValue(this.selectedProperty.id)) {

            } else {

            }

        } else {

        }
    }

    OnKeyDownDepositField(event: any) {
        if (event.key === "Enter") {
            this.OnBid()
        }

    }

}