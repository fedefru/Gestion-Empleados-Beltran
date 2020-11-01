import { IEmpresas } from '../model/empresas.model';
import { ITipoContactos } from '../model/tipo-contactos.model';
import { IPaises } from '../model/paises.model';
import { IProvincias } from '../model/provincias.model';
import { ICiudades } from '../model/ciudades.model';
import { IDirecciones } from '../model/direcciones.model';

export interface IEmpresaDto {
  nombre?: string;
  clave?: string;
  tipoContactos?: ITipoContactos;
  paises?: IPaises;
  provincias?: IProvincias;
  ciudades?: ICiudades;
  direcciones?: IDirecciones;
  empresas?: IEmpresas;
}

export class EmpresaDto implements IEmpresaDto {
  constructor(
    public nombre?: string,
    public clave?: string,
    public tipoContactos?: ITipoContactos,
    public paises?: IPaises,
    public provincias?: IProvincias,
    public ciudades?: ICiudades,
    public direcciones?: IDirecciones,
    public empresas?: IEmpresas
  ) {}
}
