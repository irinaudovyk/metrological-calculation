import {Component, OnInit} from '@angular/core';
import {InputData} from "./InputData";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-input-data',
    templateUrl: './input-data.component.html',
    styleUrls: ['./input-data.component.css']
})
export class InputDataComponent implements OnInit {

    dataPoints: number[] = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200];
    data: InputData[] = [];

    constructor(private dataService: DataService,
                private router: Router) {

    }

    ngOnInit() {
        if (this.dataService.data$.getValue()) {
            console.log('this.dataService.data$.getValue()', this.dataService.data$.getValue());
            return this.data = this.dataService.data$.getValue();
        }
        this.init();
    }

    init() {
        this.dataPoints.forEach((point) => {
            let item = new InputData();
            item.point = point;
            this.data.push(item);
        })
    }

    count() {

        this.dataService.data$.next(this.data);
        this.router.navigate(['app/result']);
    }

    clean() {
        this.data = [];
        this.init();
        this.dataService.data$.next(this.data);
    }

}
