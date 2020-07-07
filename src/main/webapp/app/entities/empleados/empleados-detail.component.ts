import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmpleados } from 'app/shared/model/empleados.model';

@Component({
  selector: 'jhi-empleados-detail',
  templateUrl: './empleados-detail.component.html',
})
export class EmpleadosDetailComponent implements OnInit {
  empleados: IEmpleados | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empleados }) => (this.empleados = empleados));
  }

  previousState(): void {
    window.history.back();
  }
}
