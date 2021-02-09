/* eslint-disable no-console */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsuarios } from 'app/shared/model/usuarios.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { UsuariosService } from './usuarios.service';
import { UsuariosDeleteDialogComponent } from './usuarios-delete-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EstadosService } from '../estados/estados.service';
import { IEstados } from 'app/shared/model/estados.model';
import { IDirecciones } from '../../shared/model/direcciones.model';
import { DireccionesService } from '../direcciones/direcciones.service';
import { IContactoUsuarios } from 'app/shared/model/contacto-usuarios.model';
import { ContactoUsuariosService } from '../contacto-usuarios/contacto-usuarios.service';

@Component({
  selector: 'jhi-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit, OnDestroy {
  usuarios?: IUsuarios[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  estados?: IEstados[];
  adress?: IDirecciones[];
  contacto?: IContactoUsuarios[];

  usuarioSeleccionado?: IUsuarios;

  public formGroup: FormGroup | undefined;

  constructor(
    protected usuariosService: UsuariosService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private formBuilder: FormBuilder,
    protected estadoService: EstadosService,
    protected direccionService: DireccionesService,
    protected contactoService: ContactoUsuariosService
  ) {}

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      id: [this.usuarioSeleccionado?.id],
      usuario: [this.usuarioSeleccionado?.usuario],
      nombre: [this.usuarioSeleccionado?.nombre],
      apellido: [this.usuarioSeleccionado?.apellido],
      fechaNac: [this.usuarioSeleccionado?.fechaNac],
      clave: [this.usuarioSeleccionado?.clave],
      contacto: [this.usuarioSeleccionado?.contacto],
      direccion: [this.usuarioSeleccionado?.direccion],
      estado: [this.usuarioSeleccionado?.estado],
    });
  }

  cargarEstados(): void {
    this.estadoService.query().subscribe((res: HttpResponse<any>) => {
      this.estados = res.body;
      console.log(this.estados);
    });
  }

  cargarDireccion(): void {
    this.direccionService.query().subscribe((res: HttpResponse<any>) => {
      this.adress = res.body;
      console.log(this.adress);
    });
  }

  cargarContacto(): void {
    this.contactoService.query().subscribe((res: HttpResponse<any>) => {
      this.contacto = res.body;
      console.log(this.contacto);
    });
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.usuariosService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IUsuarios[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerChangeInUsuarios();
    this.cargarEstados();
    this.cargarDireccion();
    this.cargarContacto();
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

  trackId(index: number, item: IUsuarios): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUsuarios(): void {
    this.eventSubscriber = this.eventManager.subscribe('usuariosListModification', () => this.loadPage());
  }

  delete(usuarios: IUsuarios): void {
    const modalRef = this.modalService.open(UsuariosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.usuarios = usuarios;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IUsuarios[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/usuarios'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.usuarios = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  editarUsuario(usuario: IUsuarios): void {
    this.usuarioSeleccionado = usuario;

    if (this.usuarioSeleccionado !== undefined) {
      this.buildForm();
    }
    console.log(usuario);
  }

  actualizarUsuario(info: any): void {
    if (info !== undefined) {
      info.id = this.usuarioSeleccionado?.id;
      console.log(info);
      /* this.usuariosService.update(info).subscribe((res: HttpResponse<IUsuarios>) => {
        console.log(res);
        window.location.reload();
      }); */
    }
  }
}
/* eslint-enable no-console */
