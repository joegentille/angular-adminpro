import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  
  tituloPadre1: string = "Sales Mercado Joe";
  etiquetasPadre1: string[] = ['Pan', 'Refresco', 'Tacos'];
  dataPadre1: number[] = [200, 300, 100];

  tituloPadre2: string = "Compras";
  etiquetasPadre2: string[] = ['Papa', 'Beterraga'];
  dataPadre2: number[] = [15,10];

  tituloPadre3: string = "Utiles escolares";
  etiquetasPadre3: string[] = ['Cuadero', 'Reglas', 'Lapiceros'];
  dataPadre3: number[] = [200,500,350];

  tituloPadre4: string = "Colores";
  etiquetasPadre4: string[] = ['Verde', 'Amarillo', 'Blanco', 'Negro','Azul'];
  dataPadre4: number[] = [65,80,20,55,20];

  // // events
  // public chartClicked({
  //   event,
  //   active,
  // }: {
  //   event: MouseEvent;
  //   active: {}[];
  // }): void {
  //   console.log(event, active);
  // }
 
  // public chartHovered({
  //   event,
  //   active,
  // }: {
  //   event: MouseEvent;
  //   active: {}[];
  // }): void {
  //   console.log(event, active);
  // }

}
