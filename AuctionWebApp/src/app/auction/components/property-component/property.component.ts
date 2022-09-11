import { Component, Input, OnInit } from "@angular/core";
import { AuctionService } from "../../services/auction.service";

@Component({
    selector:'property-component',
    templateUrl:'./property.component.html',
    styleUrls:['./property.component.scss']
})
export class PropertyComponent implements OnInit{


    @Input ('isSelected')isSelected:Boolean;
    @Input ("name")propertyName:String;
    @Input("property-value")propertyValue:Number;
    @Input("difference")differences:Number;



    constructor(
        private aucService:AuctionService
    ){}

    
    ngOnInit(): void {
        
    }


}