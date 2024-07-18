import { Component, Inject, OnInit } from '@angular/core';
import { FaturamentoService } from 'src/app/services/faturamento/faturamento.service';
import { ModalDentistaComponent } from '../modal-dentista/modal-dentista.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalPacienteComponent } from '../modal-paciente/modal-paciente.component';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})

export class PagamentoComponent implements OnInit {

  valor: number | undefined;
  metodoPagamento: string = '';
  dataPagamento: string = '';

  idDentista: number | undefined;
  idPaciente: number | undefined;

  nomeDentista: string = '';
  nome: string = '';
  emailDentista: string = '';
  dentistas: any[] = [];

  nomePaciente: string = '';
  cpfPaciente: string = '';
  pacientes: any[] = [];

  constructor(
    private pagamentoService: FaturamentoService,
    public dialog: MatDialog,
    private snackBar: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void { }

  cadastrarPagamento(): void {
    if (!this.dataPagamento || !this.valor || !this.metodoPagamento || !this.idDentista || !this.idPaciente) {
      this.snackBar.openSnackBar('Por favor, preencha todos os campos.', 'Fechar', 'warning');
      return;
    }

    const novoPagamento = {
      data_pagamento: this.dataPagamento,
      valor: this.valor,
      metodo_pagamento: this.metodoPagamento,
      idDentista: this.idDentista,
      idPaciente: this.idPaciente
    };

    this.pagamentoService.cadastrarPagamento(novoPagamento)
      .subscribe(
        () => {
          this.snackBar.openSnackBar('Pagamento cadastrado com sucesso', 'Fechar', 'success');
          this.router.navigate(['/faturamento']);
        },
        error => {
          this.snackBar.openSnackBar('Erro ao cadastrar pagamento', 'Fechar', 'error');
          console.error('Erro ao cadastrar pagamento:', error);
        }
      );
  }

  abrirModalSelecaoDentista(): void {
    this.pagamentoService.obterDentistas().subscribe(
      (dentistas) => {
        const dialogRef = this.dialog.open(ModalDentistaComponent, {
          width: '700px',
          data: { dentistas: dentistas }
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.nomeDentista = result.nome;
            this.idDentista = result.id;
          }
        });
      },
      (error) => {
        console.error('Erro ao buscar dentistas:', error);
      }
    );
  }

  abrirModalSelecaoPaciente(): void {
    this.pagamentoService.obterPaciente().subscribe(
      (pacientes) => {
        const dialogRef = this.dialog.open(ModalPacienteComponent, {
          width: '700px',
          data: { pacientes: pacientes }
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.nomePaciente = result.nome;
            this.idPaciente = result.id;
          }
        });
      },
      (error) => {
        console.error('Erro ao buscar pacientes:', error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/faturamento'])
  }
}
