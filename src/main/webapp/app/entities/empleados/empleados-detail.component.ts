/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmpleados } from 'app/shared/model/empleados.model';
import * as moment from 'moment';

@Component({
  selector: 'jhi-empleados-detail',
  templateUrl: './empleados-detail.component.html',
})
export class EmpleadosDetailComponent implements OnInit {
  empleados: IEmpleados | null = null;
  date: any;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empleados }) => (this.empleados = empleados));

    this.empleados!.fechaIngreso = moment(this.empleados?.fechaIngreso, 'YYYY-MM-DD');
    this.date = this.empleados?.fechaIngreso['_i'];
  }

  previousState(): void {
    window.history.back();
  }
}

/* eslint-enable no-console */
