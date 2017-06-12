import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class DataService {
  data$: any = new BehaviorSubject(null);

  constructor() { }

}
