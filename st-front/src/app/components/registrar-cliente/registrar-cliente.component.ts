import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-cliente.component.html'
})
export class RegistrarClienteComponent {

  dni: string = '';
  nombres: string = '';
  apellidos: string = '';
  telefono: string = '';
  direccion: string = '';

  error: string = '';
  cargando: boolean = false;

  private API = 'http://localhost:3000/api/clientes/crear'; // tu endpoint de backend

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  guardarCliente() {
    if (!this.dni || !this.nombres) {
      this.error = 'El DNI y los nombres son obligatorios';
      return;
    }

    this.cargando = true;
    this.error = '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    const body = {
      dni: this.dni,
      nombres: this.nombres,
      apellidos: this.apellidos,
      telefono: this.telefono,
      direccion: this.direccion
    };

    this.http.post<any>(this.API, body, { headers }).subscribe({
      next: (res) => {
        this.cargando = false;

        if (res.success) {
          // Guardar cliente en localStorage (opcional)
          localStorage.setItem('clienteSeleccionado', JSON.stringify(res));

          // Redirigir automáticamente a registrar impresora
          this.router.navigate(['/menu/impresoras/nueva']);
        } else {
          this.error = res.mensaje || 'Error al registrar cliente';
        }
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.mensaje || 'Error interno del servidor';
      }
    });
  }
}
