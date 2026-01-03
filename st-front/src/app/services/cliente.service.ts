import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private API_URL = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) {}

  // 🔐 Headers con JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // 📋 LISTAR CLIENTES
  listarClientes(): Observable<any> {
    return this.http.get(this.API_URL, {
      headers: this.getHeaders()
    });
  }

  // 🔍 BUSCAR CLIENTES + IMPRESORAS
  buscarClientesConImpresoras(texto: string): Observable<any> {
    return this.http.get(`${this.API_URL}/buscar/${texto}`, {
      headers: this.getHeaders()
    });
  }

  // ➕ CREAR CLIENTE (para el form)
  crearCliente(data: any): Observable<any> {
    return this.http.post(this.API_URL, data, {
      headers: this.getHeaders()
    });
  }
}
