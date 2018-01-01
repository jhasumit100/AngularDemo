import { Component, OnInit, Input } from '@angular/core';
import { Charts } from '../../Data/charts';
import { Color } from 'ng2-charts';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  charts: Charts;
  @Input('charts')
  set in (charts){
    if(charts){
      this.charts = charts;
      charts.Chartdata.dataSets.forEach(element => {
        this.lineChartData.push(element);
      });

      charts.Chartdata.labels.forEach(element => {
        this.lineChartLabels.push(element);
      });
    }
  }

  public colors: Array<Color> = [{}];
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

  constructor() { }

  ngOnInit() {
  }
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
