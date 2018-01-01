import { Component, Input } from '@angular/core';
import { Charts } from '../../Data/charts';
import { Color } from 'ng2-charts';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  charts: Charts;
  name: string;
  @Input('charts')
  set in(charts) {
    if (charts) {
      this.charts = charts;
      charts.Chartdata.dataSets.forEach(element => {
        this.pieChartDataSet.push(element);
      });
      
      charts.Chartdata.labels.forEach(element => {
        this.pieChartLabels.push(element);
      });
    }
  }
  public pieChartOptions:any = {
    elements:{
      arc:{
        borderWidth:0
      }
    }
  };
  public colors: Array<Color> = [{}];
  public pieChartDataSet : Array<any>[] = [];
  public pieChartLabels: string[] = []; 
  public pieChartColors: any[] = []; 
  public pieChartData: number[] = []; 
  public pieChartType: string = 'pie';
  constructor() {
    
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
