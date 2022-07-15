import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiderbarService {

  menu: any[] = [
    {
      titulo: 'Dashboard Joe',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard hijo', url: '/' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Graficas', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'RxJS', url: 'rxjs' }
      ]
    }
  ];

  constructor() { }
}
