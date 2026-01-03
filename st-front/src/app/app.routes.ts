import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './layout/menu/menu.component';

import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ImpresoraFormComponent } from './components/impresora-form/impresora-form.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  // 🔓 LOGIN (PÚBLICO)
  { path: 'login', component: LoginComponent },

  // 🔐 MENÚ PRINCIPAL
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [authGuard]
  },

  // 🔐 CLIENTES
  {
    path: 'clientes',
    canActivate: [authGuard],
    children: [
      { path: '', component: ClienteListComponent },   // /clientes
      { path: 'nuevo', component: ClienteFormComponent } // /clientes/nuevo ✅
    ]
  },

  // 🔐 IMPRESORAS
  {
    path: 'impresoras/nueva',
    component: ImpresoraFormComponent,
    canActivate: [authGuard]
  },

  // 🚪 REDIRECCIÓN INICIAL
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🚫 CUALQUIER OTRA RUTA
  { path: '**', redirectTo: 'login' }
];
