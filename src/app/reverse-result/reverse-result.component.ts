import { Component, OnInit } from '@angular/core';
import {InputData} from "../input-data/InputData";
import {DataService} from "../data.service";
import * as jsPdf from 'jspdf';


@Component({
  selector: 'app-reverse-result',
  templateUrl: './reverse-result.component.html',
  styleUrls: ['./reverse-result.component.css']
})
export class ReverseResultComponent implements OnInit {
  data: InputData[] = [];

  constructor(private dataService: DataService) {
    this.dataService.data$.subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit() {
    this.data.forEach((item) => {
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
    item.XCP2 = (Number(item.reverseFirst) + Number(item.reverseSecond)) / 2;
    item.XCP2 = Math.round(item.XCP2 * 100) / 100;
  }

  countEpsilon(item: InputData) {
    const t = 12.706;
    item.epsilon2 = t * item.sigma2;
    item.epsilon2 = Math.round(item.epsilon2 * 100) / 100;
  }

  countSigma(item) {
    item.sigma2 = Math.sqrt(Math.pow((item.reverseFirst - item.XCP2), 2) + Math.pow((item.reverseSecond - item.XCP2), 2));
    item.sigma2 = Math.round(item.sigma2 * 1000) / 1000;
  }

  countDeltaFirst(item) {
    item.deltaFirst2 = Math.round(Math.abs(item.point - item.reverseFirst) * 10) / 10;
  }

  countDeltaSecond(item) {
    item.deltaSecond2 = Math.round(Math.abs(item.point - item.reverseSecond) * 10) / 10;
  }

  countRelativeDeltaFirst(item) {
    item.relativeDeltaFirst2 = Math.round((item.deltaFirst2 / item.XCP2) * 10000) / 100;
  }

  countRelativeDeltaSecond(item) {
    item.relativeDeltaSecond2 = Math.round((item.deltaSecond2 / item.XCP2) * 10000) / 100;
  }

  countRelativeDeltaSumFirst(item) {
    item.relativeDeltaSumFirst2 = Math.round((item.deltaFirst2 / 200) * 10000) / 100;
  }

  countRelativeDeltaSumSecond(item) {
    item.relativeDeltaSumSecond2 = Math.round((item.deltaSecond2 / 200) * 10000) / 100;
  }

  downloadReverse() {
    const elementToPrint = document.getElementById('pdf-reverse');
    const pdf = new jsPdf('p', 'pt', 'a4');
    pdf.addHTML(elementToPrint, () => {
      pdf.save('reverse.pdf');
    });
  }
}
