import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public cabecera: string = 'PorDefecto';
  public tituloSubs$: Subscription = new Subscription();

  constructor( private router: Router ) { 

    //this.getEjemplo1();
    //this.getEjemplo2();
    this.tituloSubs$ = this.getEjemplo3()
                        .subscribe({
                          next: ({titulo}) => {  
                            this.cabecera = titulo;
                            document.title = `AdminPro - ${titulo}`; 
                          }
                        });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getEjemplo1() {
    this.router.events
      .subscribe({
        next: (event) => {
          console.log(event); // #Nota: Podemos ver lo que trae la ruta en la consola
        }
      }) 
  }

  getEjemplo2() {
    this.router.events
      .pipe(
        filter( (event: any) => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data )
      ) // #Nota: aqui hemos filtrado hasta obtener solo el { titulo: InfoEnviada }
      .subscribe({
        next: ({titulo}) => {  // Nota: Aqui estamos haciendo desestructuracion del objeto, extraer la propiedad titulo.
          this.cabecera = titulo;
          document.title = `AdminPro - ${titulo}`; //Para poner el titulo en el navegador
        }
      })  
  }

  getEjemplo3() {
    return this.router.events
      .pipe(
        filter( (event: any) => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data )
      );    
  }

}
