import { Injectable } from "@angular/core";
import { oDataService } from "./data.services";
import { Charts } from "./charts";
import { Observable } from "rxjs";
import { isNullOrUndefined } from "util";
import { getRandomString } from "selenium-webdriver/safari";

@Injectable()
export class ChartService {
    public charts: Charts;

    chartData: Charts;
    prev_link;
    next_link;
    constructor(private odataService: oDataService) {

    }

    fetchChartData() {
        return Observable.of(this.charts);
    }

    getChartData(url: string) {
        return this.odataService.fetchData(url);
    }

    async getChartDataAsync(url: string) {
        const resp = await this.odataService.fetchData(url).toPromise();
        this.charts = new Charts();
        this.charts.context = resp["@odata.context"];
        this.charts.value = resp["value"];
        this.charts.nextLink = resp["@odata.nextLink"];
        this.charts.Chartdata = new Object();
        let toolTipSet = new Set(this.charts.value.map(a => a.productgroup));
        let toolTip = new Array<string>();
        toolTipSet.forEach(item => {
            toolTip.push(item);
        });
        let dataCount = new Array<number>();
        toolTipSet.forEach(item => {
            dataCount.push(this.charts.value.map(a => a.productgroup).filter(x => x == item.toString()).length);
        });
        let backgroundColorSet = new Set();
        while (backgroundColorSet.size < toolTipSet.size) {
            backgroundColorSet.add(this.charts.getRandomColor())
        }
        let backgroundColor = new Array<any>();
        backgroundColorSet.forEach(item => {
            backgroundColor.push(item);
        });

        this.charts.Chartdata.dataSets = [
            {
                "data": dataCount,
                "backgroundColor": backgroundColor,
                "hoverBackgroundColor": backgroundColor
            }
        ];

        this.charts.Chartdata.labels = toolTip;
        return (resp);
    }

}