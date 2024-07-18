import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

//   compraForm: FormGroup;
//   formGroup: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder
//   ) {
//     this.compraForm = this.formBuilder.group({
//       nome: ['', [Validators.required, Validators.pattern('[A-Za-z\s]+')]],
//       numero: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
//       validade: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])\/[0-9]{2}')]],
//       cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]]
//     });
//    }

//    onSubmit() {
//     if (this.compraForm.valid, this.formGroup.get('campo').dirty) {
//       // Lógica para finalizar a compra
//       console.log('Compra finalizada!');
//     } else {
//       // Exibir mensagem de erro ou realizar outra ação
//       console.log('Por favor, preencha todos os campos corretamente.');
//     }
//   }

  

  ngOnInit(): void {
//     this.formGroup = this.formBuilder.group({
//       // Adicione seus controles de formulário aqui
//     });
  }
//   produtos: any[] = [
//     { nome: 'Plano Basico', preco: 60 },
//     { nome: 'Produto 2', preco: 30 },
//     { nome: 'Produto 3', preco: 20 }
//   ];

//   calcularTotal(): number {
//     return this.produtos.reduce((total, produto) => total + produto.preco, 0);
//   }

//   nomeCartao: string = '';
//   numeroCartao: string = '';
//   validadeCartao: string = '';
//   cvvCartao: string = '';
//   metodoSelecionado: string = '';
  
//   metodos = [
//     { nome: 'Cartão de Crédito ou Débito', icone: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNDN46fayEqi5RhOn-LfJ7N6VBiMwz7GGeTj-OHMG6HA&s'},
//     { nome: 'PIX', icone: 'data:image/png;base64,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' },
//     { nome: 'Paypal', icone: 'https://static.vecteezy.com/system/resources/previews/019/909/676/original/paypal-transparent-paypal-free-free-png.png'},
//     { nome: 'Boleto', icone: 'https://imagepng.org/wp-content/uploads/2019/09/boleto-simbolo.png'}
//   ];

 

//   selecionarMetodo(metodo: any) {
//     this.metodoSelecionado = metodo.nome;
//   }



}
