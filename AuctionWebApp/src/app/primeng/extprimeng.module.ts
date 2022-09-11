import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
@NgModule({
    imports:[
        ButtonModule,
        InputTextModule,
        FormsModule,
        CommonModule,
        InputNumberModule
    ],
    exports:[
        ButtonModule,
        InputTextModule,
        FormsModule,
        CommonModule,
        InputNumberModule
    ]
})
export class ExtPrimeng{}