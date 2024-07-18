import { Component, OnInit, ViewChild } from '@angular/core';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';

@Component({
  selector: 'app-pagina-inical-home',
  templateUrl: './pagina-inical-home.component.html',
  styleUrls: ['./pagina-inical-home.component.scss']
})

export class PaginaInicialHomeComponent implements OnInit {

  @ViewChild('carousel') carousel: any;
  rating!: number;
  comentario: string = '';
  userId!: number;
  slideOffset = '0';
  comentarios: any[] = [];
  novoComentario = '';
  currentIndex = 0;
  intervalId: any;
  currentImageIndex = 0;

  toggleMenu(): void {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    sidebar.classList.toggle('open');
  }

  constructor(
    private commentService: ComentarioService,
  ) { }

  ngOnInit(): void {
    this.getComentarios();
  }

  images = [
    'https://uniqueclinic.odo.br/wp-content/uploads/2018/03/post-interno.jpg.webp',
  ];

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex + this.images.length - 1) % this.images.length;
  }

  selecionarClassificacao(novaClassificacao: number) {
    this.rating = novaClassificacao;
  }

  getComentarios(): void {
    this.commentService.getComentarios()
      .subscribe(comentarios => this.comentarios = comentarios);
  }
}




