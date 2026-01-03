import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-impresora-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './impresora-form.component.html'
})
export class ImpresoraFormComponent implements OnInit {

  clientes: any[] = []; // Lista de clientes
  marca = '';
  modelo = '';
  serie = '';
  cliente_id: number | null = null;
  error = '';

  private API_URL = 'http://localhost:3000/api/impresoras';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarClientes(); // <-- carga clientes al iniciar el componente
  }

  // ===============================
  // Método corregido para obtener array
  // ===============================
  cargarClientes() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get('http://localhost:3000/api/clientes', { headers }).subscribe({
      next: (res: any) => {
        if(res.success) {
          this.clientes = res.data; // <-- array real de clientes
        } else {
          this.error = 'No se pudieron cargar los clientes';
        }
      },
      error: () => this.error = 'Error al cargar clientes'
    });
  }

  // ===============================
  // Guardar impresora
  // ===============================
  guardar() {
    if (!this.cliente_id) {
      this.error = 'Seleccione un cliente';
      return;
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = {
      marca: this.marca,
      modelo: this.modelo,
      serie: this.serie,
      cliente_id: this.cliente_id
    };

    this.http.post(this.API_URL, body, { headers }).subscribe({
      next: () => {
        alert('Impresora registrada correctamente');
        this.marca = '';
        this.modelo = '';
        this.serie = '';
        this.cliente_id = null;
        this.router.navigate(['/menu']); // Redirigir al menú
      },
      error: () => this.error = 'Error al registrar impresora'
    });
  }
}
