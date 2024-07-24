import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendamentoService } from 'src/app/services/agendamento/agendamento.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-agendar-consulta',
  templateUrl: './agendar-consulta.component.html',
  styleUrls: ['./agendar-consulta.component.scss']
})

export class AgendarConsultaComponent implements OnInit {

  nome: string = '';
  telefone: string = '';
  dataSelecionada: string = '';
  horarioSelecionado: string = '';
  horariosDisponiveis: string[] = [];
  submitting: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private consultaService: AgendamentoService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.buscarHorariosDisponiveis();
  }


  agendarConsulta(): void {
    this.submitting = true;
    if (!this.dataSelecionada || !this.nome || !this.telefone || !this.horarioSelecionado) {
      this.snackBar.openSnackBar('Por favor, preencha todos os campos.', 'Fechar', 'warning');
      return;
    }

    this.consultaService.agendarConsulta(this.nome, this.telefone, this.dataSelecionada, this.horarioSelecionado)
      .subscribe(
        (response: any) => {
          this.snackBar.openSnackBar('Consulta agendada com sucesso!', 'Ok', 'success');
          this.submitting = false;
          this.router.navigate(['/pagina-inicial-home'])
        },
        (error: HttpErrorResponse) => {
          this.snackBar.openSnackBar('Erro ao agendar consulta.', 'Fechar', 'error');
          this.submitting = false;
        }
      );
  }

  buscarHorariosDisponiveis(): void {
    if (!this.dataSelecionada) {
      this.snackBar.openSnackBar('Por favor, selecione uma data', 'Ok', 'warning');
      return;
    }

    this.consultaService.getHorariosDisponiveis(this.dataSelecionada).subscribe(
      (response: any) => {
        this.horariosDisponiveis = response.horariosDisponiveis;
      },
      (error) => {
        this.snackBar.openSnackBar('Erro ao buscar horários disponíveis. Por favor, tente novamente.', 'Fechar', 'error');
      }
    );
  }

  onDataSelecionadaChange(): void {
    this.buscarHorariosDisponiveis();
  }

  toggleMenu(): void {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    sidebar.classList.toggle('open');
  }

}
