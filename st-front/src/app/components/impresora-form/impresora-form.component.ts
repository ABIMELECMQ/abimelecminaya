import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-impresora-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './impresora-form.component.html'
})
export class ImpresoraFormComponent {

  busqueda = '';
  clientes: any[] = [];
  clienteSeleccionado: any = null;

  marca = '';
  modelo = '';
  serie = '';
  error = '';

  private API_IMPRESORAS = 'http://localhost:3000/api/impresoras';
  private API_CLIENTES = 'http://localhost:3000/api/clientes/buscar';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  buscarClientes() {
    if (this.busqueda.length < 2) {
      this.clientes = [];
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<any>(
      `${this.API_CLIENTES}?texto=${this.busqueda}`,
      { headers }
    ).subscribe(res => {
      this.clientes = res.data || [];
    });
  }

  seleccionarCliente(cliente: any) {
    this.clienteSeleccionado = cliente;
    this.clientes = [];
    this.busqueda = `${cliente.nombres} ${cliente.apellidos}`;
  }

  guardar() {
    if (!this.clienteSeleccionado) {
      this.error = 'Debe seleccionar un cliente';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    const body = {
      marca: this.marca,
      modelo: this.modelo,
      serie: this.serie,
      cliente_id: this.clienteSeleccionado.id
    };

    this.http.post(this.API_IMPRESORAS, body, { headers }).subscribe({
      next: () => {
        alert('Impresora registrada correctamente');
        this.router.navigate(['/menu']);
      },
      error: () => this.error = 'Error al registrar impresora'
    });
  }
}
