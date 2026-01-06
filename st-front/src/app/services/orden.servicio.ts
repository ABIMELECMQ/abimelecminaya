import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrdenServicioService {

  private url = 'http://localhost:3000/api/ordenes';

  constructor(private http: HttpClient) {}

  obtenerOrdenesTaller() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<any>(`${this.url}/taller`, { headers });
  }

  cambiarEstado(id: number, estado_id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(
      `${this.url}/${id}/estado`,
      { estado_id },
      { headers }
    );
  }
}
