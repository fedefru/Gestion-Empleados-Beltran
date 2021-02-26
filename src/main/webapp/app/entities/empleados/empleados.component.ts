/* eslint-disable no-console */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmpleados } from 'app/shared/model/empleados.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { AccountService } from 'app/core/auth/account.service';
import { EmpleadosService } from './empleados.service';
import { EmpleadosDeleteDialogComponent } from './empleados-delete-dialog.component';
import { EmpresasService } from '../empresas/empresas.service';

@Component({
  selector: 'jhi-empleados',
  templateUrl: './empleados.component.html',
})
export class EmpleadosComponent implements OnInit, OnDestroy {
  empleados?: IEmpleados[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  cuentaLogueada?: any;
  empresaLogueada?: any;
  empFiltrados: any;

  constructor(
    protected empleadosService: EmpleadosService,
    protected accountService: AccountService,
    protected empresasService: EmpresasService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.empleadosService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IEmpleados[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    // Obtengo el nombre de usuario de la persona logueada
    this.accountService.identity().subscribe(account => {
      this.cuentaLogueada = account!.login;
    });

    // Obtengo la empresa Logueada, si es que es empresa
    this.empresasService.findByUsuario(this.cuentaLogueada).subscribe(empresa => {
      this.empresaLogueada = empresa.body;
    });

    this.handleNavigation();
    this.registerChangeInEmpleados();
  }

  protected handleNavigation(): void {
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEmpleados): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEmpleados(): void {
    this.eventSubscriber = this.eventManager.subscribe('empleadosListModification', () => this.loadPage());
  }

  delete(empleados: IEmpleados): void {
    const modalRef = this.modalService.open(EmpleadosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.empleados = empleados;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IEmpleados[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/empleados'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.empleados = data || [];
    console.clear();

    console.log('Empleados sin filtrar => ', this.empleados);
    if (this.empresaLogueada !== undefined) {
      console.log('Empresa ', this.empresaLogueada['id']);
      this.empleados = this.empleados.filter(empleado => {
        return empleado.empresa!.id === this.empresaLogueada['id'];
      });
    }
    console.log('Empleados filtrados => ', this.empleados);

    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}

/* eslint-enable no-console */
