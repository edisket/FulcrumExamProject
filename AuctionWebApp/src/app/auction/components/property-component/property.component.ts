import { Component, Input, OnInit } from "@angular/core";
import { AuctionService } from "../../services/auction.service";

@Component({
    selector: 'property-component',
    templateUrl: './property.component.html',
    styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {


    @Input('selectedId') selectedId: Number;
    @Input ('propertyId')propertyId:Number;
    @Input("name") propertyName: String;
    @Input("property-value") propertyValue: Number;
    @Input("difference") differences: Number;



    constructor(
        private aucService: AuctionService
    ) { }


    ngOnInit(): void {

    }



    ChangeColor(val: any) {

        if (val == 0) {
            return { color: 'gray' }
        } else {
            return val > 0 ? { color: 'green' } : { color: 'red' }
        }
    }

    ChangeIcon(val: any) {

        if (val == 0) {
            return "col-1 pi pi-caret-right"
        } else {

            return val > 0 ? "col-1 pi pi-caret-up" : "col-1 pi pi-caret-down"
        }
    }

}