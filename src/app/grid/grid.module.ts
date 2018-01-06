import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid-layout/grid.component';
import { MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,MatFormFieldModule,MatInputModule,MatTableModule,MatPaginatorModule
  ],
  exports:[
    GridComponent
  ],
  providers:[],
  declarations: [GridComponent]
})
export class GridModule { }
