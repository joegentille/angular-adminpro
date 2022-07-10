import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  
  @Input() progreso: number = 60;
  // @Input('valor') progreso: number = 60; // Para renombrar el argumento que enviamos desde el padre, en progress.components.html cambiariamos [progreso] por [valor]

  @Output() valorSalida: EventEmitter<number> = new EventEmitter(); // Usualmente los outputs son de tipo event emitter.

  @Input() btnClass: string = 'btn-primary';

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    return this.valorSalida.emit( this.progreso );
  }

  cuandoCambia( nuevoValor: number ) {
    if( nuevoValor >= 100 ) {
      this.progreso = 100;
    } else if ( nuevoValor <= 0 ){
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
  }

}
