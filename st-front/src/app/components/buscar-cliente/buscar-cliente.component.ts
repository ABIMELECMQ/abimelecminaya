import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-cliente.component.html'
})
export class BuscarClienteComponent {

  query: string = '';
  clientes: any[] = [];
  clienteSeleccionado: any = null;
  error: string = '';

  private API = 'http://localhost:3000/api/clientes/buscar-con-impresoras';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  buscar() {
    // 🔒 Si ya hay cliente seleccionado, no seguir buscando
    if (this.clienteSeleccionado) {
      return;
    }

    if (this.query.trim().length < 2) {
      this.clientes = [];
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<any>(
      `${this.API}?texto=${this.query}`,
      { headers }
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.clientes = res.data || [];
          this.error = '';
        } else {
          this.clientes = [];
          this.error = 'No se encontraron resultados';
        }
      },
      error: () => {
        this.error = 'Error al buscar clientes';
        this.clientes = [];
      }
    });
  }

  seleccionarCliente(cliente: any) {
    this.clienteSeleccionado = cliente;
    this.query = `${cliente.nombres} ${cliente.apellidos}`;
    this.clientes = [cliente]; // muestra solo el seleccionado
  }

  cambiarCliente() {
    this.clienteSeleccionado = null;
    this.query = '';
    this.clientes = [];
  }

  crearOrden(clienteId: number, impresoraId: number) {
    this.router.navigate([
      '/orden/crear',
      clienteId,
      impresoraId
    ]);
  }
}

