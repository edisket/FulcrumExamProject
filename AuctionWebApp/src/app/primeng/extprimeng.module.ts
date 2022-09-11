import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
@NgModule({
    imports:[
        ButtonModule,
        InputTextModule,
        FormsModule,
        CommonModule
    ],
    exports:[
        ButtonModule,
        InputTextModule,
        FormsModule,
        CommonModule
    ]
})
export class ExtPrimeng{}