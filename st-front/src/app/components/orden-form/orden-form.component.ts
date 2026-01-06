import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orden-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orden-form.component.html'
})
export class OrdenFormComponent implements OnInit {

  cliente: any = null;
  impresora: any = null;

  orden = {
    cliente_id: 0,
    impresoras_id: 0,
    tecnico_id: 1,
    motivo_cliente: '',
    descripcion_falla: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const clienteId = Number(this.route.snapshot.paramMap.get('clienteId'));
    const impresoraId = Number(this.route.snapshot.paramMap.get('impresoraId'));

    this.orden.cliente_id = clienteId;
    this.orden.impresoras_id = impresoraId;

    this.cargarCliente(clienteId);
    this.cargarImpresora(impresoraId);
  }

  cargarCliente(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<any>(
      `http://localhost:3000/api/clientes/${id}`,
      { headers }
    ).subscribe(res => {
      this.cliente = res.data;
    });
  }

  cargarImpresora(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get<any>(
      `http://localhost:3000/api/impresoras/${id}`,
      { headers }
    ).subscribe(res => {
      this.impresora = res.data;
    });
  }

  guardarOrden() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    this.http.post(
      'http://localhost:3000/api/ordenes',
      this.orden,
      { headers }
    ).subscribe(() => {
      alert('Orden creada correctamente');
      this.router.navigate(['/menu']);
    });
  }
}
