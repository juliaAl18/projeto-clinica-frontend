import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FaturamentoService } from 'src/app/services/faturamento/faturamento.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-modal-paciente',
  templateUrl: './modal-paciente.component.html',
  styleUrls: ['./modal-paciente.component.scss']
})

export class ModalPacienteComponent implements OnInit {

  pacientes: any[] = [];
  pacienteSelecionado: any;

  constructor(
    private pacienteService: FaturamentoService,
    private dialogRef: MatDialogRef<ModalPacienteComponent>,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.carregarPacientes();
  }

  carregarPacientes(): void {
    this.pacienteService.obterPaciente().subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error) => {
        console.error('Erro ao obter pacientes:', error);
      }
    );
  }

  selecionarPacientes(pacientes: any): void {
    this.pacienteSelecionado = pacientes;
  }

  confirmarSelecao(): void {
    if (this.pacienteSelecionado) {
      this.dialogRef.close(this.pacienteSelecionado);
    } else {
      this.snackBar.openSnackBar('Por favor, selecione pelo menos 1 paciente.', 'Ok', 'warning')
    }
  }
};


