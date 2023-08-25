import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from './models/cliente.model'; 

@Pipe({
  name: 'filtroClientes'
})
export class FiltroClientesPipe implements PipeTransform {
  transform(clientes: Cliente[], filtroNome: string, filtroAtivos: boolean): Cliente[] {
    return clientes.filter(cliente => {
      // Filtra por nome
      if (filtroNome && !cliente.nome.toLowerCase().includes(filtroNome.toLowerCase())) {
        return false;
      }

      // Filtra por ativos
      if (filtroAtivos && !cliente.ativo) {
        return false;
      }

      return true;
    });
  }
}
