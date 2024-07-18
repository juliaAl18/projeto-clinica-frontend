import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipamentosService } from 'src/app/services/equipamentos/equipamentos.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-equipamentos-cadastrar',
  templateUrl: './equipamentos-cadastrar.component.html',
  styleUrls: ['./equipamentos-cadastrar.component.scss']
})

export class EquipamentosCadastrarComponent implements OnInit {

  equipamentoForm: FormGroup;
  dataSource: MatTableDataSource<any>;

  constructor(
    private equipamentosService: EquipamentosService,
    private formBuilder: FormBuilder,
    private snackBar: SnackBarService,
    private router: Router
  ) {
    this.equipamentoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      marca: [''],
      modelo: [''],
      ano_fabricacao: ['', Validators.pattern('^[0-9]*$')],
      disponivel: [true]
    });
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.carregarEquipamentos();
  }

  carregarEquipamentos() {
    this.equipamentosService.getEquipamentos().subscribe((equipamentos) => {
      this.dataSource = new MatTableDataSource(equipamentos);
    });
  }

  cadastrarEquipamento(): void {
    if (this.equipamentoForm.valid) {
      const dadosEquipamento = this.equipamentoForm.value;
      this.equipamentosService.cadastrarEquipamento(dadosEquipamento).subscribe(
        () => {
          this.snackBar.openSnackBar('Equipamento cadastrado com sucesso', 'Fechar', 'success');
          this.equipamentoForm.reset();
          this.router.navigate(['/equipamentos']);
          this.carregarEquipamentos();
        },
        (error) => {
          console.error('Erro ao cadastrar equipamento:', error);
          this.snackBar.openSnackBar('Erro ao cadastrar equipamento', 'Fechar', 'error');
        }
      );
    } else {
      this.snackBar.openSnackBar('Por favor, preencha todos os campos obrigatórios', 'Fechar', 'warning');
    }
  }

  sairTelaDeCadastro(): void {
    this.router.navigate(['/equipamentos'])
  }


}

