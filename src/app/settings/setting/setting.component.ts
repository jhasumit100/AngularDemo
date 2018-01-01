import { Component, Input } from '@angular/core';
import { Charts } from '../../Data/charts';
import { FormControl, FormGroup, FormArray } from '@angular/forms/src/model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'widget-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent{

  charts : Charts;
  @Input('charts')
  set in (charts){
    if(charts){
      this.charts = charts;
      let toolTipSet = new Set(this.charts.value.map(a => a.productgroup));
      toolTipSet.forEach(item => {
          this.ProductGroupList.push(item);
      });
    }
  }
  WidgetSettings;
  ProductGroupList : string[] = [];
  //ProductSubCategoryList : string[] = [];
  constructor() {

   }
  // events
  public onWidgetSettingsChange(){
    //console.log(WidgetSettings);
  }

}
