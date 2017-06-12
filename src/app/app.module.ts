import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InputDataComponent } from './input-data/input-data.component';
import {AppRoutingModule} from "./app-routing.module";
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { DirectResultComponent } from './direct-result/direct-result.component';
import { ResultComponent } from './result/result.component'
import {DataService} from "./data.service";
import { ReverseResultComponent } from './reverse-result/reverse-result.component';

@NgModule({
  declarations: [
    AppComponent,
    InputDataComponent,
    DirectResultComponent,
    ResultComponent,
    ReverseResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2TableModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
