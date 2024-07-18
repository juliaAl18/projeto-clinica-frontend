export interface UsuarioInterface {
    id: number;
    nome: string;
    email: string;
    senha: string;
    nivel_acesso: 'admin' | 'usuario';
    isAuthenticated(): boolean;
    isAdmin(): boolean;
}