import { Component, Input } from '@angular/core';
import { Charts } from '../../Data/charts';
import { Color } from 'ng2-charts';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  charts : Charts;
  @Input('charts')
  set in (charts){
    if (charts) {
      this.charts = charts;
      charts.Chartdata.dataSets.forEach(element => {
        this.barChartData.push(element);
      });
      
      charts.Chartdata.labels.forEach(element => {
        this.barChartLabels.push(element);
      });
    }
  }
  public colors: Array<Color> = [{}];
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [];

  constructor() { }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
