import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  // LOGIN (PÚBLICO)
  { path: 'login', component: LoginComponent },

  // SISTEMA (PROTEGIDO CON JWT)
  {
    path: 'clientes',
    component: ClienteListComponent,
    canActivate: [authGuard]
  },

  // REDIRECCIÓN INICIAL
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // RUTA NO EXISTENTE
  { path: '**', redirectTo: 'login' }
];
