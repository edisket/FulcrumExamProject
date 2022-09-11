import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'imageviewer-component',
    templateUrl:'./imageviewer-component.html',
    styleUrls:['./imageviewer-component.scss']
})
export class ImageViewerComponent{


    @Input('is-display') isDisplayImage:boolean =true
    @Input('imagefilename') imagefilename:string = "";
    @Output('onnext') onNextEvent = new EventEmitter();
    @Output('onprevious') onPreviousEvent = new EventEmitter();



    srcFile:string = "assets/img/" + this.imagefilename;


    OnNext(){
        this.onNextEvent.emit();
    }

    OnPrevious(){

        this.onPreviousEvent.emit();
    }
}
