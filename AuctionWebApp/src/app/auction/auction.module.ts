import { APP_INITIALIZER, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ExtPrimeng } from "../primeng/extprimeng.module";
import { AuctionComponent } from "./components/auction-component/auction.component";
import { ImageViewerComponent } from "./components/imageviewer-component/imageviewer-component";
import { PropertyComponent } from "./components/property-component/property.component";
import { ValueColorDirective } from "./directives/valueColor.directive";
import { AuctionService } from "./services/auction.service";

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, tap } from "rxjs";



    @NgModule({
        declarations:[
            AuctionComponent,
            PropertyComponent,
            ImageViewerComponent,
            ValueColorDirective
        
        ],
        imports:[
            ExtPrimeng,
            HttpClientModule,
            RouterModule.forChild([
                {
                    path:'',
                    component:AuctionComponent
                }
            ])
        ],
        providers:[
            AuctionService,

        ]
    })
    export class AuctioNModule{}