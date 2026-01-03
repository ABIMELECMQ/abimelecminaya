import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'] // ✅ CORRECTO
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = []; 
  textoBusqueda: string = '';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.clientes = response.data;
        }
      },
      error: (error: any) => {
        console.error('Error al cargar los clientes:', error);
      }
    });
  }

  buscarClientes(): void {
    if (!this.textoBusqueda.trim()) {
      this.cargarClientes();
      return;
    }

    this.clienteService
      .buscarClientesConImpresoras(this.textoBusqueda)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.clientes = response.data;
          }
        },
        error: (error: any) => {
          console.error('Error al buscar clientes:', error);
        }
      });
  }
}
