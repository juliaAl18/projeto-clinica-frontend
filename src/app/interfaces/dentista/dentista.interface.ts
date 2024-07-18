export interface Dentista {
  id?: number;
  cpf: string;
  nome: string;
  especialidade: string;
  email: string;
  dataNascimento: string;
  telefone: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  nivel_acesso: string,
  cep: string
}
