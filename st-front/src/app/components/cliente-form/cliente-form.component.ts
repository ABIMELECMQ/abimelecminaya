import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent {

  dni = '';
  nombres = '';
  apellidos = '';
  telefono = '';
  direccion = '';
  error = '';

  private API_URL = 'http://localhost:3000/api/clientes';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  guardar() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = {
      dni: this.dni,
      nombres: this.nombres,
      apellidos: this.apellidos,
      telefono: this.telefono,
      direccion: this.direccion
    };

    this.http.post(this.API_URL, body, { headers }).subscribe({
      next: () => {
        this.router.navigate(['/menu']);
      },
      error: () => {
        this.error = 'Error al registrar cliente';
      }
    });
  }
}
