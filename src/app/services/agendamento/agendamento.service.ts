import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private baseUrl = 'http://localhost:3000/api/marcar-consulta';
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  agendarConsulta(nome: string, telefone: string, data: string, hora: string): Observable<any> {
    const body = { nome, telefone, data, hora };
    return this.http.post<any>(this.baseUrl, body);
  }

  getHorariosDisponiveis(data: string): Observable<string[]> {
    const url = `${this.apiUrl}/api/horarios-disponiveis?data=${data}`;
    return this.http.get<string[]>(url);
  }
  
}
