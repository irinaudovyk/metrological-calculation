import {Component} from '@angular/core';

import * as jsPdf from 'jspdf';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']

})
export class ResultComponent  {
    download() {
        const elementToPrint = document.getElementById('pdf');
        // let l = {
        //     orientation: 'p',
        //     unit: 'mm',
        //     format: 'a3',
        //     compress: true,
        //     fontSize: 11,
        //     lineHeight: 1,
        //     autoSize: false,
        //     printHeaders: true
        // };

        const pdf = new jsPdf('p', 'pt', 'a4');
        pdf.addHTML(elementToPrint, () => {
            pdf.save('result.pdf');
        });

        // pdf.fromHTML(elementToPrint, 15, 15, {
        //     'width': 170
        // });
        // pdf.save('result.pdf');
    }

}
