import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-buscar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-cliente.component.html'
})
export class BuscarClienteComponent {

  query = '';
  clientes: any[] = [];
  error = '';

  constructor(private http: HttpClient) {}

  buscar() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.error = 'Sesión no válida';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get(
      `http://localhost:3000/api/clientes/buscar-con-impresoras?texto=${this.query}`,
      { headers }
    ).subscribe({
      next: (res: any) => {
        console.log('RESPUESTA BACKEND:', res);

        if (res.success && res.data.length > 0) {
          this.clientes = res.data;
          this.error = '';
        } else {
          this.clientes = [];
          this.error = 'No se encontraron resultados';
        }
      },
      error: () => {
        this.error = 'Error al buscar cliente';
      }
    });
  }
}
