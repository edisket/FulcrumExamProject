import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
@NgModule({
    imports:[
        ButtonModule,
        InputTextModule,
        FormsModule,
        CommonModule,
        InputNumberModule,
        ToastModule,
        TooltipModule
        
    ],
    exports:[
        ButtonModule,
        InputTextModule,
        FormsModule,
        CommonModule,
        InputNumberModule,
        ToastModule,
        TooltipModule
    ]
})
export class ExtPrimeng{}