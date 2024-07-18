import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipamentoInterface } from 'src/app/interfaces/equipamentos/equipamentos.interface';

@Injectable({
  providedIn: 'root'
})
export class EquipamentosService {
  
  constructor(
    private http: HttpClient,
  ) {}

  private url = 'http://localhost:3000/api';

  getEquipamentos(nome?: string): Observable<EquipamentoInterface[]> {
    let url = `${this.url}/equipamentos/?nome=${nome || ''}`;
    return this.http.get<EquipamentoInterface[]>(url);
  }

  excluirEquipamento(id: number): Observable<any> {
    const url = `${this.url}/equipamentos/${id}`;
    return this.http.delete(url);
  }

  equipamentoPorId(id: number): Observable<EquipamentoInterface> {
    return this.http.get<EquipamentoInterface>(`${this.url}/equipamentos/${id}`);
  }

  atualizarEquipamento(id: number, equipamento: EquipamentoInterface): Observable<EquipamentoInterface> {
    return this.http.put<EquipamentoInterface>(`${this.url}/equipamentos/${id}`, equipamento);
  }

  cadastrarEquipamento(equipamento: any): Observable<any> {
    return this.http.post<any>(`${this.url}/equipamentos`, equipamento);
  }

}
