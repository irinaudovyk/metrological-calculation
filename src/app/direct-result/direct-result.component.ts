import {Component, OnInit, Input} from '@angular/core';
import {InputData} from "../input-data/InputData";
import {DataService} from "../data.service";

import * as jsPdf from 'jspdf';

@Component({
    selector: 'app-direct-result',
    templateUrl: './direct-result.component.html',
    styleUrls: ['./direct-result.component.css']
})
export class DirectResultComponent implements OnInit {
    data: InputData[] = [];

    constructor(private dataService: DataService) {
        this.dataService.data$.subscribe((data) => {
            this.data = data;
        });
    }

    ngOnInit() {
        this.data && this.data.forEach((item) => {
            this.countXCP(item);
            this.countSigma(item);
            this.countEpsilon(item);
            this.countDeltaFirst(item);
            this.countDeltaSecond(item);
            this.countRelativeDeltaFirst(item);
            this.countRelativeDeltaSecond(item);
            this.countRelativeDeltaSumFirst(item);
            this.countRelativeDeltaSumSecond(item);
        })
    }

    countXCP(item: InputData) {
        item.XCP = (Number(item.directFirst) + Number(item.directSecond)) / 2;
        item.XCP = Math.round(item.XCP * 100) / 100;
    }

    countEpsilon(item: InputData) {
        const t = 12.706;
        item.epsilon = t * item.sigma;
        item.epsilon = Math.round(item.epsilon * 100) / 100;
    }

    countSigma(item) {
        item.sigma = Math.sqrt(Math.pow((item.directFirst - item.XCP), 2) + Math.pow((item.directSecond - item.XCP), 2));
        item.sigma = Math.round(item.sigma * 1000) / 1000;
    }

    countDeltaFirst(item) {
        item.deltaFirst = Math.round(Math.abs(item.point - item.directFirst) * 10) / 10;
    }

    countDeltaSecond(item) {
        item.deltaSecond = Math.round(Math.abs(item.point - item.directSecond) * 10) / 10;
    }

    countRelativeDeltaFirst(item) {
        item.relativeDeltaFirst = Math.round((item.deltaFirst / item.XCP) * 10000) / 100;
    }

    countRelativeDeltaSecond(item) {
        item.relativeDeltaSecond = Math.round((item.deltaSecond / item.XCP) * 10000) / 100;
    }

    countRelativeDeltaSumFirst(item) {
        item.relativeDeltaSumFirst = Math.round((item.deltaFirst / 200) * 10000) / 100;
    }

    countRelativeDeltaSumSecond(item) {
        item.relativeDeltaSumSecond = Math.round((item.deltaSecond / 200) * 10000) / 100;
    }

    downloadDirect() {
        const elementToPrint = document.getElementById('pdf-direct');
        // let l = {
        //     orientation: 'p',
        //     unit: 'mm',
        //     format: 'a3',
        //     compress: true,
        //     fontSize: 8,
        //     lineHeight: 1,
        //     autoSize: false,
        //     printHeaders: true
        // };

        const pdf = new jsPdf('p', 'pt', 'a4');



        pdf.addHTML(elementToPrint, () => {
            pdf.save('direct.pdf');
        });
    }
}
