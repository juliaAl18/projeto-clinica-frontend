import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FaturamentoService } from 'src/app/services/faturamento/faturamento.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-modal-dentista',
  templateUrl: './modal-dentista.component.html',
  styleUrls: ['./modal-dentista.component.scss']
})

export class ModalDentistaComponent implements OnInit {

  dentistas: any[] = [];
  dentistaSelecionado: any;

  constructor(
    private dentistaService: FaturamentoService,
    private dialogRef: MatDialogRef<ModalDentistaComponent>,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.carregarDentistas();
  }

  carregarDentistas(): void {
    this.dentistaService.obterDentistas().subscribe(
      (data) => {
        this.dentistas = data;
      },
      (error) => {
        console.error('Erro ao obter dentistas:', error);
      }
    );
  }

  selecionarDentista(dentista: any): void {
    this.dentistaSelecionado = dentista;
  }

  confirmarSelecao(): void {
    if (this.dentistaSelecionado) {
      this.dialogRef.close(this.dentistaSelecionado);
    } else {
      this.snackBar.openSnackBar('Por favor, selecione pelo menos 1 dentista.', 'Fechar', 'warning')
    }
  }
}
