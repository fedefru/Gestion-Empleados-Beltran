import { Component, OnInit } from '@angular/core';
import { FichajesService } from '../fichajes.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-interfaz-fichaje',
  templateUrl: './interfaz-fichaje.component.html',
  styleUrls: ['./interfaz-fichaje.component.scss'],
})
export class InterfazFichajeComponent implements OnInit {
  informacion: string[];
  atencion: boolean;
  exito: boolean;
  spinner: boolean;
  error: boolean;

  constructor(protected fichajesService: FichajesService) {
    this.informacion = [];
    this.atencion = true;
    this.exito = false;
    this.spinner = false;
    this.error = false;
  }

  ngOnInit(): void {}

  activarReconocimiento(): void {
    this.atencion = false;
    this.error = false;
    this.spinner = true;

    this.fichajesService.reconocerRostro().subscribe((res: HttpResponse<any>) => {
      this.informacion = res.body || [];

      if (this.informacion['code'] === '200') {
        this.spinner = false;
        this.atencion = false;
        this.exito = true;
      } else {
        this.spinner = false;
        this.atencion = false;
        this.error = true;
      }
    });
  }
}
