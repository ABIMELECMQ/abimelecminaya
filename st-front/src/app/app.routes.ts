import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './layout/menu/menu.component';

import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ImpresoraFormComponent } from './components/impresora-form/impresora-form.component';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';
import { OrdenFormComponent } from './components/orden-form/orden-form.component';
import { OrdenesTallerComponent } from './components/ordenes-taller/ordenes-taller.component';


import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [authGuard],
    children: [

      // 🔁 REDIRECCIÓN POR DEFECTO
      {
        path: '',
        redirectTo: 'ordenes/taller',
        pathMatch: 'full'
      },

      {
        path: 'buscar-cliente',
        component: BuscarClienteComponent
      },

      {
        path: 'clientes',
        children: [
          { path: '', component: ClienteListComponent },
          { path: 'nuevo', component: ClienteFormComponent }
        ]
      },

      {
        path: 'impresoras/nueva',
        component: ImpresoraFormComponent
      },

      {
        path: 'orden/crear/:clienteId/:impresoraId',
        component: OrdenFormComponent
      },

      {
        path: 'ordenes/taller',
        component: OrdenesTallerComponent
      }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
