import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenServicioService } from '../../services/orden.servicio';

@Component({
  selector: 'app-ordenes-taller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ordenes-taller.component.html'
})
export class OrdenesTallerComponent implements OnInit {

  ordenes: any[] = [];
  rol = '';

  constructor(private ordenService: OrdenServicioService) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.rol = JSON.parse(usuario).rol;
    }

    this.cargarOrdenes();
  }

  cargarOrdenes() {
    this.ordenService.obtenerOrdenesTaller().subscribe({
      next: (data) => this.ordenes = data,
      error: () => alert('Error al cargar órdenes')
    });
  }

  cambiarEstado(ordenId: number, estadoId: number) {
    this.ordenService.cambiarEstado(ordenId, estadoId).subscribe({
      next: () => {
        alert('Estado actualizado');
        this.cargarOrdenes();
      },
      error: () => alert('Error al cambiar estado')
    });
  }
}

