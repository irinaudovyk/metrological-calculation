import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {InputDataComponent} from "./input-data/input-data.component";
import {ResultComponent} from "./result/result.component";


const routes: Routes = [
  {path: '', redirectTo: 'app/input', pathMatch: 'full'},
  {
    path: 'app',
    children: [
      {
        path: 'input',
        component: InputDataComponent
      },
      {
        path: 'result',
        component: ResultComponent
      }
    ]
  },

  {path: '**', redirectTo: 'app/input', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}