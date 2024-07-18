export interface PagamentoInterface {
  id?: number;
  data_pagamento: string;
  valor: number;
  metodo_pagamento: string;
  idDentista: number;
  idPaciente: number;
}