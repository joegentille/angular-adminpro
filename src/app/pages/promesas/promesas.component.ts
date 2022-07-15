import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // Nota:
    // Las promesas se usan cuando queremos ejecutar algo despues de que una tarea suceda.
    
    // Ejemplo 1
    // const promesa = new Promise((resolve, reject) => {
    //   if(false) {
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Algo salio mal')
    //   }
    // });

    // promesa.then((mensaje) => {
    //   console.log(mensaje);
    // })
    // .catch(error => console.log('Error en mi promesa', error));

    // console.log('Fin del init');
    
    // Ejemplo 2 
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    });

  }

  getUsuarios() {

    const promesa = new Promise( resolve => {
      
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => console.log(body.data) );

    });

    return promesa;
  }

}
