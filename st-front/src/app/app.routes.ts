import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';

export const routes: Routes = [
{path:'', redirectTo:'/clientes', pathMatch:'full'},// Ruta por defecto redirige a /clientes
{path:'clientes', component:ClienteListComponent},// Ruta para listar clientes

];
