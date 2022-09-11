import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuctionService } from './auction/services/auction.service';



function initializeAppFactory(auctionService:AuctionService){

  return ()=>auctionService.InitializePropertyData();
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuctionService,
    {
      provide:APP_INITIALIZER,
      useFactory:initializeAppFactory,
      deps:[AuctionService],
      multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
