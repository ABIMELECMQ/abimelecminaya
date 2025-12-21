import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteResponse } from '../models/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

private apiUrl= `${environment.apiUrl}/clientes`;
  constructor(private http: HttpClient) { }

  listarClientes(): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(this.apiUrl); // Ajuste el tipo de retorno según la estructura de datos esperada
  }

  buscarClientesConImpresoras(texto: string): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.apiUrl}/buscar-con-impresoras?texto=${texto}`);
}
}
