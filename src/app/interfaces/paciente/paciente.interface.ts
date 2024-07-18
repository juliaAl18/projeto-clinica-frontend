export interface PacienteInterface {
    id?: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
    genero?: 'Masculino' | 'Feminino' | 'Outro';
    email?: string;
    telefone?: string;
    endereco?: string;
    cidade?: string;
    estado?: string;
    cep: string;
    nivel_acesso: string
}
