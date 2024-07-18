import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss']
})
export class PlanosComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void { }

  planos = [
    {
      id: 1,
      nome: 'Plano Odonto Sorriso Real',
      descricao: ' Nosso Plano Odonto Sorriso Real oferece uma cobertura abrangente para cuidados odontológicos essenciais. Ele inclui consultas regulares, limpezas profissionais, radiografias preventivas e tratamento de cáries. Este plano é ideal para indivíduos que buscam manter uma boa saúde bucal com serviços básicos e essenciais.',
      incluso: 'Consultas regulares, limpezas profissionais, radiografias preventivas, tratamento de cáries.',
      preco: 'R$ 70/mês'
    },
    {
      id: 2,
      nome: 'Plano Odonto VIP',
      descricao: ' O Plano Odonto VIP oferece uma cobertura ampla e completa para cuidados odontológicos. Além dos serviços do Plano Sorriso Real, este plano inclui procedimentos estéticos avançados, como clareamento dental, implantes dentários e próteses. É recomendado para quem busca o máximo em cuidados odontológicos.',
      incluso: ' Consultas regulares, limpezas profissionais, tratamento de cáries, tratamento ortodôntico, restaurações estéticas, tratamento de canal, clareamento dental, implantes dentários, próteses.',
      preco: 'R$ 100,00/mês'
    },
    {
      id: 3,
      nome: 'Plano Odonto Excelência',
      descricao: 'O Plano Odonto Excelência é o pacote mais completo e abrangente, oferecendo todos os serviços do Plano Odonto VIP e adição de benefícios extras, como cobertura para cirurgias bucais e próteses mais avançadas. É indicado para quem deseja uma cobertura odontológica de alto nível e está disposto a investir em sua saúde bucal.',
      incluso: 'Consultas regulares, limpezas profissionais, tratamento de cáries, tratamento ortodôntico, restaurações estéticas, tratamento de canal, clareamento dental, implantes demorados, próteses avançadas, cirurgias bucais.',
      preco: 'R$ 180/mês'
    }
  ];



}
