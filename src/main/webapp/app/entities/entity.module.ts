import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'paises',
        loadChildren: () => import('./paises/paises.module').then(m => m.GestionEmpleadosPaisesModule),
      },
      {
        path: 'provincias',
        loadChildren: () => import('./provincias/provincias.module').then(m => m.GestionEmpleadosProvinciasModule),
      },
      {
        path: 'ciudades',
        loadChildren: () => import('./ciudades/ciudades.module').then(m => m.GestionEmpleadosCiudadesModule),
      },
      {
        path: 'direcciones',
        loadChildren: () => import('./direcciones/direcciones.module').then(m => m.GestionEmpleadosDireccionesModule),
      },
      {
        path: 'tipo-direccion',
        loadChildren: () => import('./tipo-direccion/tipo-direccion.module').then(m => m.GestionEmpleadosTipoDireccionModule),
      },
      {
        path: 'empresas',
        loadChildren: () => import('./empresas/empresas.module').then(m => m.GestionEmpleadosEmpresasModule),
      },
      {
        path: 'entidades-empresas',
        loadChildren: () => import('./entidades-empresas/entidades-empresas.module').then(m => m.GestionEmpleadosEntidadesEmpresasModule),
      },
      {
        path: 'entidades-usuarios',
        loadChildren: () => import('./entidades-usuarios/entidades-usuarios.module').then(m => m.GestionEmpleadosEntidadesUsuariosModule),
      },
      {
        path: 'entidades',
        loadChildren: () => import('./entidades/entidades.module').then(m => m.GestionEmpleadosEntidadesModule),
      },
      {
        path: 'estados',
        loadChildren: () => import('./estados/estados.module').then(m => m.GestionEmpleadosEstadosModule),
      },
      {
        path: 'contacto-empresas',
        loadChildren: () => import('./contacto-empresas/contacto-empresas.module').then(m => m.GestionEmpleadosContactoEmpresasModule),
      },
      {
        path: 'tipo-contactos',
        loadChildren: () => import('./tipo-contactos/tipo-contactos.module').then(m => m.GestionEmpleadosTipoContactosModule),
      },
      {
        path: 'contacto-usuarios',
        loadChildren: () => import('./contacto-usuarios/contacto-usuarios.module').then(m => m.GestionEmpleadosContactoUsuariosModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.GestionEmpleadosUsuariosModule),
      },
      {
        path: 'tipo-documentos',
        loadChildren: () => import('./tipo-documentos/tipo-documentos.module').then(m => m.GestionEmpleadosTipoDocumentosModule),
      },
      {
        path: 'grupo-usuarios',
        loadChildren: () => import('./grupo-usuarios/grupo-usuarios.module').then(m => m.GestionEmpleadosGrupoUsuariosModule),
      },
      {
        path: 'permisos-grupos',
        loadChildren: () => import('./permisos-grupos/permisos-grupos.module').then(m => m.GestionEmpleadosPermisosGruposModule),
      },
      {
        path: 'grupos',
        loadChildren: () => import('./grupos/grupos.module').then(m => m.GestionEmpleadosGruposModule),
      },
      {
        path: 'permisos',
        loadChildren: () => import('./permisos/permisos.module').then(m => m.GestionEmpleadosPermisosModule),
      },
      {
        path: 'empleados',
        loadChildren: () => import('./empleados/empleados.module').then(m => m.GestionEmpleadosEmpleadosModule),
      },
      {
        path: 'fichajes',
        loadChildren: () => import('./fichajes/fichajes.module').then(m => m.GestionEmpleadosFichajesModule),
      },
      {
        path: 'puestos',
        loadChildren: () => import('./puestos/puestos.module').then(m => m.GestionEmpleadosPuestosModule),
      },
      {
        path: 'areas',
        loadChildren: () => import('./areas/areas.module').then(m => m.GestionEmpleadosAreasModule),
      },
      {
        path: 'configuraciones',
        loadChildren: () => import('./configuraciones/configuraciones.module').then(m => m.GestionEmpleadosConfiguracionesModule),
      },
      {
        path: 'imagenes-fichaje',
        loadChildren: () => import('./imagenes-fichaje/imagenes-fichaje.module').then(m => m.GestionEmpleadosImagenesFichajeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GestionEmpleadosEntityModule {}
