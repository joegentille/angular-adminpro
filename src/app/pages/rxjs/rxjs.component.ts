import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, pipe, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription = new Subscription();

  constructor() { 

    //this.beginExample1();
    //this.beginExample2();
    //this.beginExample3();
    //this.beginExample4();
    //this.beginExample5();
    //this.beginExample6();
    //this.beginExample7();
    //this.beginExample8();
    this.beginExample9();

  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  // Ejemplo del Observable
  beginExample1() {

    let i = -1;
    const obs$ = new Observable( observer => {      
      const intervalo = setInterval(() => {
        console.log('tick');
      }, 1000) // con lo que vaya adentro del setInterval, se ejecutará infinamente cada segundo.
    }); // #Nota: No es obligatorio, pero por convencion se pone un signo de dolar para indicar que se una variable observable
        // Le ponemos observer, pero en realidad puede ser cualquier nombre, el observer es de tipo Subscriber

    obs$.subscribe(); // Se pone el subscribe para que el obs$ empiece a trabajar    
  }

  // Ejemplo con complete()
  beginExample2() {

    const obs$ = new Observable( observer => {
      let i = -1;
      
      const intervalo = setInterval(() => {
        i++;
        observer.next(i); // next es el siguiente valor que queremos emitir.

        if( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }

      }, 1000) 
    }); 
    
    obs$.subscribe({
      next: (valor) => {
        console.log('Subs: ', valor)
      },
      error: (error) => { 
        console.warn('Error: ', error) 
      },
      complete: () => {
        console.info('Obs terminado');
      }
    })
  }

  // Ejemplo con error()
  beginExample3() {
    let i = -1;

    const obs$ = new Observable( observer => {
      
      const intervalo = setInterval(() => {

        i++;
        observer.next(i); // next es el siguiente valor que queremos emitir.

        if( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        if( i === 2 ) {
          observer.error('i llego al valor de 2'); // En este caso, si se dispara el error, ya no llega al complete. Termina el observable.
        }
      }, 1000) 
    }); 

    obs$.subscribe({
      next: (valor) => {
        console.log('Subs: ', valor)
      },
      error: (error) => { 
        console.warn('Error: ', error) 
      },
      complete: () => {
        console.info('Obs terminado');
      }
    })
  }

  // Ejemplo con retry()
  beginExample4() {
    let i = -1;

    const obs$ = new Observable( observer => {
      
      const intervalo = setInterval(() => {

        i++;
        observer.next(i); // next es el siguiente valor que queremos emitir.
        if( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        if( i === 2 ) {
          console.log('i = 2..... error');
          observer.error('i llego al valor de 2'); // En este caso, si se dispara el error, ya no llega al complete. Termina el observable.
        }
      }, 1000) 
    }); 

    obs$.pipe(    // Nota: pipe se usa para transformar (o reintentar) la informacion que fluye a travez del observable
      retry()    // cuando i == 2 se genera un error y deberia de terminar, pero al haber el retry dice: ok lo intentare de nuevo y como i cambia a 3 continua con la iteracion.
      // retry(1) se pone el valor para indicar que intente de nuevo solo 1 vez
    ).subscribe({
      next: (valor) => {
        console.log('Subs: ', valor)
      },
      error: (error) => { 
        console.warn('Error: ', error) 
      },
      complete: () => {
        console.info('Obs terminado');
      }
    })
  }

  // Ejemplo con retornaObservable()
  beginExample5() {

    
    this.retornaObservable().pipe(    // Nota: pipe se usa para transformar (o reintentar) la informacion que fluye a travez del observable
      retry(1)    // cuando i == 2 se genera un error y deberia de terminar, pero al haber el retry dice: ok lo intentare de nuevo y como i cambia a 3 continua con la iteracion.
      // retry(1) se pone el valor para indicar que intente de nuevo solo 1 vez
    ).subscribe({
      next: (valor) => {
        console.log('Subs: ', valor)
      },
      error: (error) => { 
        console.warn('Error: ', error) 
      },
      complete: () => {
        console.info('Obs terminado');
      }
    })

  }

  retornaObservable(): Observable<number> {

    let i = -1;

    const obs$ = new Observable<number>( observer => {
      
      const intervalo = setInterval(() => {
        
        i++;
        observer.next(i); 

        if( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        if( i === 2 ) {
          observer.error('i llego al valor de 2');
        }
      }, 1000) 
      
    }); 

    return obs$;

  }

  beginExample6() {

    this.retornaInvervalo()      
      .subscribe({
        next: (valor) => { console.log(valor); }
      })

  }

  retornaInvervalo() {

    const intervalo$ = interval(1000)
      .pipe(
        take(4)
      );

    return intervalo$;
  }

  // Ejemplo con map
  beginExample7() {

    this.retornaInvervaloMap()      
      .subscribe({
        next: (valor) => { console.log(valor); }
      })

  }

  retornaInvervaloMap() {
    // Nota: El map me sirve para transformar la informacion que recibe el observable y mutarle de la manera que yo necesito.
    const intervalo$ = interval(1000)
      .pipe(
        take(4),
        map( valor => {
          //return valor + 1;
          //return 'Hola Mundo';
          return 'Hola Mundo ' + valor;
        })
      );

    return intervalo$;
  }

  beginExample8() {
    this.retornaInvervaloFilter()      
      .subscribe({
        next: (valor) => { console.log(valor); }
      })
  }

  retornaInvervaloFilter() {
    // Nota: El map me sirve para transformar la informacion que recibe el observable y mutarle de la manera que yo necesito.
    const intervalo$ = interval(500)
      .pipe(
        map( valor => valor + 1 ),
        filter( valor => ( valor % 2 === 0 ) ? true : false), // Cuando es false ya no sigue, el take no se dispara, cuando es true sigue al take 
        take(10) // Otro ejemplo es mover el take(10) antes de map
      );

    return intervalo$;
  }

  // Ejemplo con Unsubscribe
  beginExample9() {

    this.intervalSubs = this.retornaInvervaloUnsubscribe()      
      .subscribe({
        next: (valor) => { console.log(valor); }
      })
  }

  retornaInvervaloUnsubscribe() {
    // #Nota: Cuando destruya el componente es importante hacer la limpieza, en este caso cancelar el intervalo.
    const intervalo$ = interval(100)
      .pipe(
        map( valor => valor + 1 ),
        filter( valor => ( valor % 2 === 0 ) ? true : false),
      );

    return intervalo$;
  }

}
