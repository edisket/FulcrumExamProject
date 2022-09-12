import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin, interval, startWith, switchMap } from "rxjs";
import { AuctionData } from "src/app/model/AuctionData";
import { BiddingData } from "src/app/model/BiddingData";
import { AuctionService } from "../../services/auction.service";
import { MessageService } from 'primeng/api';
@Component({
    selector: 'auction-component',
    templateUrl: './auction.component.html',
    styleUrls: ['./auction.component.scss'],
    providers: [MessageService]
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
        private messageService: MessageService
    ) {
        this.propertyList = AuctionService.propertyData;
        this.selectedProperty = this.propertyList[this.selectedIndex];
    }

    ngOnInit(): void {

        interval(2000)
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

        this.selectedIndex--;
        if (this.propertyList.length > 0) {
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.propertyList.length - 1;

            }
            this.selectedProperty = this.propertyList[this.selectedIndex];

        }



    }

    OnPrevious() {
        this.selectedIndex++;
        if (this.propertyList.length > 0) {

            if (this.selectedIndex >= this.propertyList.length) {
                this.selectedIndex = 0;
            }

            this.selectedProperty = this.propertyList[this.selectedIndex];
        }
    }

    GetCurrentValue(propertyId: any) {
        let data = this.biddingData.find(x => x.PROPERTY_ID == propertyId)?.WINNING_BID

        //If there is not bidding data yet, get the current data from property info wherein the current value = reserve price
        if(!data){
            data = this.propertyList.find(x=> x.id  == propertyId).current_value;
        }
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
                this.auctionService.InsertBid(this.selectedProperty.id, val).subscribe(x => {

                    if (x['is_success'])
                        this.messageService.add({ severity: 'success', summary: 'Successful Bidding', detail: 'Deposit bidding success.' })
                    

                }, err => {
                    console.log(err)
                    this.messageService.add({ severity: 'error', summary: 'Error Bidding', detail: err.error.message })
                })


               


            } else {
                this.messageService.add({ severity: 'error', summary: 'Invalid Bidding', detail: 'Value should be greater than current value.' })
                
            }

        } else {
            this.messageService.add({ severity: 'error', summary: 'Invalid Bidding', detail: 'Value should be greater than 0.' })
        }

        this.depositValue = "";
    }

    OnKeyDownDepositField(event: any) {
        if (event.key === "Enter") {
            this.OnBid()
        }

    }

}