import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

 
 @Directive({
    selector:'[valueColor]'
 })
 export class ValueColorDirective implements OnChanges{

    @Input() valueColor:any;

    constructor(private element:ElementRef){

       
        // this.element.nativeElement.style.backgroundColor = 'yellow';
    }
     ngOnChanges(changes: SimpleChanges): void {

        if(this.element.nativeElement.innerText.replace('$',"")>0){
            this.element.nativeElement.style.color = "green"
        }else if(this.element.nativeElement.innerText.replace('$',"") < 0){
            this.element.nativeElement.style.color = "red"
        }
     }

 }