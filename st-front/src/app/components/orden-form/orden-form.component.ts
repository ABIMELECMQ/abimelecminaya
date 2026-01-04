import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-orden-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orden-form.component.html'
})
export class OrdenFormComponent implements OnInit {

  // 🔹 IDs recibidos por ruta
  clienteId!: number;
  impresoraId!: number;

  // 🔹 Info solo para mostrar
  clienteInfo = '';
  impresoraInfo = '';

  // 🔹 Combos
  estados: any[] = [];
  tecnicos: any[] = [];

  // 🔹 Orden
  orden = {
    estado_id: 1, // Registrada (default)
    tecnico_id: '',
    motivo_cliente: '',
    descripcion_falla: ''
  };

  error = '';

  private API_ORDEN = 'http://localhost:3000/api/ordenes';
  private API_ESTADOS = 'http://localhost:3000/api/estado-orden';
  private API_TECNICOS = 'http://localhost:3000/api/tecnicos';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1️⃣ Obtener IDs desde la URL
    this.clienteId = Number(this.route.snapshot.paramMap.get('clienteId'));
    this.impresoraId = Number(this.route.snapshot.paramMap.get('impresoraId'));

    // 2️⃣ Cargar datos necesarios
    this.cargarEstados();
    this.cargarTecnicos();
    this.cargarDatosCliente();
    this.cargarDatosImpresora();
  }

  // 🔐 Headers con token
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  // 🔹 Estados
  cargarEstados() {
    this.http.get<any>(this.API_ESTADOS, this.getHeaders())
      .subscribe(res => {
        this.estados = res.data;
        // estado por defecto: Registrada
        const registrado = this.estados.find(e => e.nombre === 'Registrada');
        if (registrado) {
          this.orden.estado_id = registrado.id;
        }
      });
  }

  // 🔹 Técnicos
  cargarTecnicos() {
    this.http.get<any>(this.API_TECNICOS, this.getHeaders())
      .subscribe(res => {
        this.tecnicos = res.data;
      });
  }

  // 🔹 Cliente (solo para mostrar)
  cargarDatosCliente() {
    this.http.get<any>(
      `http://localhost:3000/api/clientes/${this.clienteId}`,
      this.getHeaders()
    ).subscribe(res => {
      const c = res.data;
      this.clienteInfo = `${c.nombres} ${c.apellidos} (${c.dni})`;
    });
  }

  // 🔹 Impresora (solo para mostrar)
  cargarDatosImpresora() {
    this.http.get<any>(
      `http://localhost:3000/api/impresoras/${this.impresoraId}`,
      this.getHeaders()
    ).subscribe(res => {
      const i = res.data;
      this.impresoraInfo = `${i.marca} ${i.modelo} | ${i.serie}`;
    });
  }

  // 💾 Guardar orden
  guardarOrden() {
    if (!this.orden.tecnico_id) {
      this.error = 'Debe seleccionar un técnico';
      return;
    }

    const body = {
      cliente_id: this.clienteId,
      impresoras_id: this.impresoraId,
      tecnico_id: this.orden.tecnico_id,
      estado_id: this.orden.estado_id,
      motivo_cliente: this.orden.motivo_cliente,
      descripcion_falla: this.orden.descripcion_falla
    };

    this.http.post(this.API_ORDEN, body, this.getHeaders())
      .subscribe({
        next: () => {
          alert('Orden de servicio creada correctamente');
          this.router.navigate(['/menu']);
        },
        error: () => {
          this.error = 'Error al crear la orden';
        }
      });
  }
}
