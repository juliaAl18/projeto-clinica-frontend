import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EquipamentoInterface } from 'src/app/interfaces/equipamentos/equipamentos.interface';
import { EquipamentosService } from 'src/app/services/equipamentos/equipamentos.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-equipamentos-editar',
  templateUrl: './equipamentos-editar.component.html',
  styleUrls: ['./equipamentos-editar.component.scss']
})

export class EquipamentosEditarComponent implements OnInit, OnDestroy {

  equipamento!: EquipamentoInterface;
  equipamentoId!: number;

  minhaSubscricao: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private equipamentosService: EquipamentosService,
    private snackBar: SnackBarService
  ) {
    this.minhaSubscricao = new Subscription();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.equipamentoId = +idParam;
        this.carregarEquipamento(this.equipamentoId);
      } else {
        console.error('ID do equipamento não encontrado na rota');
      }
    });
  }

  ngOnDestroy(): void {
    this.minhaSubscricao.unsubscribe();
  }

  carregarEquipamento(id: number): void {
    this.minhaSubscricao = this.equipamentosService.equipamentoPorId(id).subscribe(
      (data: EquipamentoInterface) => {
        this.equipamento = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao carregar equipamento:', error);
      }
    );
  }

  salvarEdicao(): void {
    if (this.equipamento !== null) {
      this.minhaSubscricao = this.equipamentosService.atualizarEquipamento(this.equipamentoId, this.equipamento).subscribe(
        (response: any) => {
          this.snackBar.openSnackBar(
            "Edição concluída com sucesso!",
            "Ok",
            "success"
          );
          console.log('Equipamento atualizado com sucesso!');
          this.router.navigate(['/equipamentos']);
        },
        (error: HttpErrorResponse) => {
          this.snackBar.openSnackBar(
            "Erro ao atualizar equipamento.!",
            "Ok",
            "error"
          );
          console.error('Erro ao atualizar equipamento:', error);
          console.error('Detalhes do erro:', error.error);
        }
      );
    } else {
      this.snackBar.openSnackBar(
        "Equipamento não carregado ou inválido",
        "Ok",
        "warning"
      );
      console.error('Equipamento não carregado ou inválido');
    }
  }
}
