import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit {  
  @Input() tituloHijo1: string = "Nada";
  @Input() dataHijo1: number[] = [10,10,10];
  @Input('etiquetasHijo1') doughnutChartLabels: string[] = ['a','b','c'];
  
  getValor() {
    console.log(this.doughnutChartLabels);
  }

  doughnutChartData: ChartData<'doughnut', number[]> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [],
        backgroundColor: ['rgba(148,159,177,0.2)'],
        // backgroundColor: ['#00821C','#09DB36','#024D0F', '#00821C'],
        // hoverBackgroundColor: ['#00821C','#09DB36','#024D0F', '#00821C'],
        // hoverBorderColor:['#000000','#000000','#00000003', '#00821C']
      },
    ]
  };
  
  doughnutChartType: ChartType = 'doughnut';

  ngOnInit(): void {
    this.getValor();    
    this.doughnutChartData.labels = this.doughnutChartLabels;
    this.doughnutChartData.datasets = [{
      data: this.dataHijo1
    }]
  }

}
