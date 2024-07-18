import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FaturamentoInterface } from 'src/app/interfaces/faturamento/faturamento.interface';
import { FaturamentoService } from 'src/app/services/faturamento/faturamento.service';

@Component({
  selector: 'app-faturamento',
  templateUrl: './faturamento.component.html',
  styleUrls: ['./faturamento.component.scss']
})

export class FaturamentoComponent implements OnInit {

  filtroForm: FormGroup;
  faturamentos: FaturamentoInterface[] = [];
  dataSource: any[] = [];
  displayedColumns: string[] = ['mes', 'ano', 'valor_faturado'];

  constructor(
    private faturamentoService: FaturamentoService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.filtroForm = this.formBuilder.group({
      mes: [''],
      ano: ['']
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.carregarFaturamentos();
  }

  initForm(): void {
    this.filtroForm = this.formBuilder.group({
      mes: [''],
      ano: ['']
    });
  }

  carregarFaturamentos(): void {
    this.faturamentoService.getFaturamentos().subscribe(
      faturamentos => {
        console.log('Faturamentos carregados:', faturamentos);
        this.faturamentos = faturamentos;
      },
      error => {
        console.error('Erro ao carregar faturamentos:', error);
      }
    );
  }

  toggleMenu(): void {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    sidebar.classList.toggle('open');
  }

  irParaCadastro(): void {
    this.router.navigate(['/pagamento']);
  }

}
