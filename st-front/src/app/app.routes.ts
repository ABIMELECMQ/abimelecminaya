import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './layout/menu/menu.component';

import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ImpresoraFormComponent } from './components/impresora-form/impresora-form.component';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';
import { OrdenFormComponent } from './components/orden-form/orden-form.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  // 🔓 LOGIN
  { path: 'login', component: LoginComponent },

  // 🔐 MENÚ PRINCIPAL
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [authGuard]
  },

  // 🔐 BUSCAR CLIENTE
  {
    path: 'buscar-cliente',
    component: BuscarClienteComponent,
    canActivate: [authGuard]
  },

  // 🔐 CLIENTES
  {
    path: 'clientes',
    canActivate: [authGuard],
    children: [
      { path: '', component: ClienteListComponent },
      { path: 'nuevo', component: ClienteFormComponent }
    ]
  },

  // 🔐 IMPRESORAS
  {
    path: 'impresoras/nueva',
    component: ImpresoraFormComponent,
    canActivate: [authGuard]
  },

  // 🔐 CREAR ORDEN DE SERVICIO
  {
    path: 'orden/crear/:clienteId/:impresoraId',
    component: OrdenFormComponent,
    canActivate: [authGuard]
  },

  // 🚪 REDIRECCIÓN INICIAL
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🚫 CUALQUIER OTRA RUTA
  { path: '**', redirectTo: 'login' }

];
