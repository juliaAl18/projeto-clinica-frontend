import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteInterface } from 'src/app/interfaces/paciente/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  cadastrarPaciente(pacienteData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/pacientes`, pacienteData);
  }

  consultarCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(url);
  }

  buscarPacientes(): Observable<PacienteInterface[]> {
    return this.http.get<PacienteInterface[]>(`${this.baseUrl}/pacientes`);
  }

  pesquisarPacientes(nome: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pacientes-filtro?nome=${nome}`);
  }

  editarPaciente(id: number, paciente: PacienteInterface): Observable<PacienteInterface> {
    return this.http.put<PacienteInterface>(`${this.baseUrl}/paciente-editar/${id}`, paciente);
  }

  pacientePorId(id: number): Observable<PacienteInterface> {
    return this.http.get<PacienteInterface>(`${this.baseUrl}/pacientes/${id}`);
  }

  deletarPaciente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pacientes-deletar/${id}`);
  }

  enviarPromocao(): Observable<string> {
    return this.http.get(`${this.baseUrl}/enviar-promocao`, { responseType: 'text' });
  }
}
