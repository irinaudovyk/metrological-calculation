import {Component, OnInit} from '@angular/core';

import * as jsPdf from 'jspdf';
import {DataService} from "../data.service";
import {InputData} from "../input-data/InputData";
import {Router} from "@angular/router";

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']

})

export class ResultComponent implements OnInit {

    data: InputData[];

    constructor(private dataService: DataService,
                private router: Router) {
        this.dataService.data$.subscribe((data) => {
            this.data = data;
        });
    }

    ngOnInit() {
        if (!this.data) {
            this.router.navigate([''])
        }
    }

    download() {
        const elementToPrint = document.getElementById('pdf');

        const pdf = new jsPdf('p', 'pt', 'a4');
        let options = {
            pagesplit: true
        };
        pdf.addHTML(elementToPrint, 0, 0, options, () => {
            pdf.save('result.pdf');
        });

    }

}
