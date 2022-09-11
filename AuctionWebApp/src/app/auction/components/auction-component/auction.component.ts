import { Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuctionService } from "../../services/auction.service";

@Component({
    selector:'auction-component',
    templateUrl:'./auction.component.html',
    styleUrls:['./auction.component.scss']
})
export class AuctionComponent{

    @ViewChild("DepositField")depositField:ElementRef;


    selectedIndex:number = 0;
    selectedProperty:any;
    depositValue?:string=undefined;
    propertyList:any[] = [];
    biddingData:any[]=[]
    isDisplayImage:boolean = true;

    constructor(
        private auctionService : AuctionService,
        private route:ActivatedRoute
    ){

        this.propertyList = this.auctionService.propertyData;

        this.selectedProperty = this.propertyList[this.selectedIndex];

    }


    OnDisplayImage(event:any){

        this.isDisplayImage = !this.isDisplayImage;
    }


    OnNext(){
        this.selectedIndex++;
        if(this.propertyList.length > 0 ){

            

            if(this.selectedIndex >= this.propertyList.length){
                this.selectedIndex = 0;
         
            }


            this.selectedProperty = this.propertyList[this.selectedIndex];
        }
    }


    OnPrevious(){

        this.selectedIndex--;

        if(this.propertyList.length > 0){
            if(this.selectedIndex < 0){
                this.selectedIndex = this.propertyList.length - 1;

            }
            this.selectedProperty = this.propertyList[this.selectedIndex];

        }
        
    }





}