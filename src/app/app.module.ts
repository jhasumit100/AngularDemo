import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SidenavLayoutModule } from './sidenav-layout';
import { SidenavToggleService } from './sidenav-layout/sidenav-toggle.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,MatButtonModule,MatIconModule,SidenavLayoutModule,
    BrowserAnimationsModule,MatToolbarModule,MatMenuModule
  ],
  providers: [SidenavToggleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
