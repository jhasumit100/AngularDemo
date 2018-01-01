import { StyleData } from "./widget-data";
import { Observable } from "rxjs/Observable";

export class Charts{
    context;
    value : StyleData[];
    nextLink;
    Chartdata;

    getRandomColor(){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for(var i = 0; i < 6; i++){
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}