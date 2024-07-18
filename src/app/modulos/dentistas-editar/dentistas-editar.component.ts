import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Dentista } from 'src/app/interfaces/dentista/dentista.interface';
import { DentistaService } from 'src/app/services/dentista/dentista.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-dentistas-editar',
  templateUrl: './dentistas-editar.component.html',
  styleUrls: ['./dentistas-editar.component.scss']
})
export class DentistasEditarComponent implements OnInit {

  dentista!: Dentista;
  dentistaId!: number;
  minhaSubscricao: Subscription;
  telefone: string = '';

  novoDentista: Dentista = {
    cpf: '',
    nome: '',
    especialidade: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    nivel_acesso: '',
    cep: ''
  }

  constructor(
    private dentistaService: DentistaService,
    private route: ActivatedRoute,
    private snackBar: SnackBarService,
    private router: Router
  ) {
    this.minhaSubscricao = new Subscription();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.dentistaId = +idParam;
        this.carregarEquipamento(this.dentistaId);
      } else {
        console.error('ID do equipamento não encontrado na rota');
      }
    });
  }

  carregarEquipamento(id: number): void {
    this.minhaSubscricao = this.dentistaService.dentistaPorId(id).subscribe(
      (data: Dentista) => {
        this.dentista = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao carregar equipamento:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.minhaSubscricao.unsubscribe();
  }

  salvarEdicao(): void {
    if (this.dentista !== null) {
      this.minhaSubscricao = this.dentistaService.editarDentista(this.dentistaId, this.dentista).subscribe(
        (response: any) => {
          this.snackBar.openSnackBar(
            "Edição concluída com sucesso!",
            "Ok",
            "success"
          );
          console.log('Equipamento atualizado com sucesso!');
          this.router.navigate(['dentistas-consultar'])
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

  formatarTelefone() {
    let numeroLimpo = this.telefone.replace(/\D/g, '');

    if (numeroLimpo.length >= 2) {
      numeroLimpo = `(${numeroLimpo.substring(0, 2)})${numeroLimpo.substring(2)}`;
    }

    if (numeroLimpo.length > 11) {
      numeroLimpo = numeroLimpo.substring(0, 11);
    }
    this.telefone = numeroLimpo;
  }

  formatarCEP() {
    let cep = this.dentista.cep.replace(/\D/g, '');
    cep = cep.substring(0, 8);
    this.dentista.cep = cep;
  }

  buscarEnderecoPorCep() {
    if (this.dentista.cep.length === 8) {
      this.dentistaService.consultarCep(this.dentista.cep).subscribe(
        (endereco: any) => {
          this.dentista.endereco = endereco.logradouro;
          this.dentista.cidade = endereco.localidade;
          this.dentista.estado = endereco.uf;
        },
        error => {
          console.error('Erro ao buscar endereço por CEP:', error);
        }
      );
    }
  }

  formatarCPF(event: any) {
    const inputElement = event.target as HTMLInputElement;
    let cpf = inputElement.value.replace(/\D/g, '');
    cpf = cpf.substring(0, 11);

    if (cpf.length === 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    this.dentista.cpf = cpf;
  }

  voltar() {
    this.router.navigate(['/dentistas-consultar'])
  }

}
