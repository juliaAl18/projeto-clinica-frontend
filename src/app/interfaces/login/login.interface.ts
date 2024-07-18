import { UsuarioInterface } from "../usuario/usuario.interface";

export interface LoginInterface {
  message: string;
  token?: string;
  usuario?: UsuarioInterface;
}