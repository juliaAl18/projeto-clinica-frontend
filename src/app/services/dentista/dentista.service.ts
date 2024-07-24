import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dentista } from 'src/app/interfaces/dentista/dentista.interface';

@Injectable({
  providedIn: 'root'
})
export class DentistaService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }
  
  cadastrarDentista(dentistaData: Dentista): Observable<Dentista> {
    return this.http.post<Dentista>(`${this.baseUrl}/dentistas`, dentistaData);
  }

  consultarCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(url);
  }

  getAllDentistas(): Observable<Dentista[]> {
    return this.http.get<Dentista[]>(`${this.baseUrl}/dentistas-filtro`);
  }

  filtrarDentistasPorNome(nome: string): Observable<Dentista[]> {
    const url = `${this.baseUrl}/dentistas-filtro/?nome=${nome}`;
    return this.http.get<Dentista[]>(url);
  }

  deletarDentista(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/dentistas/${id}`);
  }

  editarDentista(id: number, Dentista: Dentista): Observable<Dentista> {
    return this.http.put<Dentista>(`${this.baseUrl}/dentistas/${id}`, Dentista);
  }

  dentistaPorId(id: number): Observable<Dentista> {
    return this.http.get<Dentista>(`${this.baseUrl}/dentistas/${id}`);
  }
}
