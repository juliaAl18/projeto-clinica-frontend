import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/interfaces/comentario/comentario.interface';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  apiUrl = 'http://localhost:3000/api/comentarios';

  constructor(
    private http: HttpClient
  ) { }

  getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.apiUrl);
  }
}
