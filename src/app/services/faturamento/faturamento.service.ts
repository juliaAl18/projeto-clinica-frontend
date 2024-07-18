import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError} from 'rxjs';
import { FaturamentoInterface } from 'src/app/interfaces/faturamento/faturamento.interface';

@Injectable({
  providedIn: 'root'
})
export class FaturamentoService {

  baseUrl = 'http://localhost:3000/api'

  constructor(
    private http: HttpClient
  ) { }

  getFaturamentos(): Observable<FaturamentoInterface[]> {
    return this.http.get<FaturamentoInterface[]>(`${this.baseUrl}/faturamento-mensal`);
  }

  cadastrarPagamento(pagamentoData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cadastrar-pagamento`, pagamentoData)
      .pipe(
        catchError(error => {
          throw 'Erro ao cadastrar pagamento: ' + error;
        })
      );
  }

  obterDentistas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/buscar-dentistas`);
  }

  obterPaciente(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/buscar-pacientes`);
  }
}
