import { Component, Input } from '@angular/core';
import { Charts } from '../../Data/charts';
import { Color } from 'ng2-charts';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent {
  charts : Charts;
  @Input('charts') 
  set in (charts){
    if (charts) {
      this.charts = charts;
      charts.Chartdata.dataSets.forEach(element => {
        this.doughnutChartDataSet.push(element);
      });
      
      charts.Chartdata.labels.forEach(element => {
        this.doughnutChartLabels.push(element);
      });
    }
  }
  // Doughnut

  public doughnutChartOptions:any = {
    elements:{
      arc:{
        borderWidth:0
      }
    }
  };
  public colors: Array<Color> = [{}];
  public doughnutChartDataSet : Array<any>[] = [];
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  constructor() { }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
