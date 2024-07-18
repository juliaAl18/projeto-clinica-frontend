import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Comentario } from 'src/app/interfaces/comentario/comentario.interface';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})

export class ComentariosComponent implements OnInit, OnDestroy {

  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  currentIndex = 0;
  intervalId: any;
  comentario: Comentario[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private commentService: ComentarioService
  ) { }

  ngOnInit(): void {
    this.getComentarios();
    this.startAutoRotation();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  nextComment(): void {
    const carouselTrack = this.carouselTrack.nativeElement;

    const isLastComment = this.currentIndex === this.comentario.length - 1;

    if (isLastComment) {
      this.comentario.push(this.comentario.shift()!);
    } else {
      this.comentario.unshift(this.comentario.pop()!);
    }
    this.currentIndex = (this.currentIndex + 1) % this.comentario.length;

    carouselTrack.style.animation = isLastComment ? 'slideLeft 0.5s ease-in-out' : 'slideRight 0.5s ease-in-out';
  }

  prevComment() {
    this.currentIndex = (this.currentIndex - 1 + this.comentario.length) % this.comentario.length;
  }

  getComentarios(): void {
    this.commentService.getComentarios()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(comentarios => {
        this.comentario = comentarios;
      });
  }

  startAutoRotation(): void {
    this.intervalId = setInterval(() => {
      this.nextComment();
    }, 8000);
  }
}
