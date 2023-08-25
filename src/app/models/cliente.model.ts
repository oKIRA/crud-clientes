export class Cliente {
  id!: number;
  nome: string = '';
  tipo: string = ''; // "Pessoa Física" ou "Pessoa Jurídica"
  cpfCnpj: string = '';
  rgIe: string = '';
  dataCadastro: Date | null = null;
  ativo: boolean = false;
  telefones: string[] = []; // Array de números de telefone
}
