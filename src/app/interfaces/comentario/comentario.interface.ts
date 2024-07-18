export interface Comentario {
  id: number;
  usuario_id: number;
  comentario: string;
  data_publicacao: Date;
  avaliacao: number;
  nome_usuario: string;
  email_usuario: string;
}
