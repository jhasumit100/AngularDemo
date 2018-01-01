import { Component,Input } from '@angular/core';
import { Charts } from '../../Data/charts';

@Component({
  selector: 'widget-content-layout',
  templateUrl: './widget-content-layout.component.html',
  styleUrls: ['./widget-content-layout.component.css']
})
export class WidgetContentLayoutComponent {
  data;
  @Input() charts: Charts;

  constructor() {
  }
}
