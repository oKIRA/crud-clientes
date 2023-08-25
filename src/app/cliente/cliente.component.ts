import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  filtroNome: string = '';
  filtroAtivo: boolean = false;
  novoCliente: Cliente = new Cliente();
  modoEdicao = false;
  clienteEditadoId: number | null = null;
  exibirFormulario = false;
  filtroAtivos = false;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  toggleAdicionarCliente(): void {
    this.exibirFormulario = !this.exibirFormulario;
    this.novoCliente = new Cliente();
    this.modoEdicao = false;
    this.clienteEditadoId = null;
  }

  cancelarEdicao(): void {
    this.exibirFormulario = false;
    this.novoCliente = new Cliente();
    this.modoEdicao = false;
    this.clienteEditadoId = null;
  }

  carregarClientes(): void {
    this.clienteService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.aplicarFiltros();
    });
  }

  adicionarOuEditarCliente(): void {
    const clienteExistente = this.clientes.find(cliente =>
      cliente.cpfCnpj === this.novoCliente.cpfCnpj
    );

    if (clienteExistente && (!this.modoEdicao || clienteExistente.id !== this.novoCliente.id)) {
      console.log('Cliente com CPF/CNPJ já cadastrado');
      return;
    }

    if (this.modoEdicao && this.clienteEditadoId !== null) {
      this.clienteService.atualizarCliente(this.clienteEditadoId, this.novoCliente).subscribe(() => {
        this.carregarClientes();
      });
    } else {
      this.clienteService.adicionarCliente(this.novoCliente).subscribe(() => {
        this.carregarClientes();
      });
    }
    this.novoCliente = new Cliente();
    this.modoEdicao = false;
    this.clienteEditadoId = null;
    this.exibirFormulario = false;
  }

  editarCliente(cliente: Cliente): void {
    this.novoCliente = { ...cliente };
    this.modoEdicao = true;
    this.clienteEditadoId = cliente.id;
  }

  excluirCliente(id: number): void {
    this.clienteService.excluirCliente(id).subscribe(() => {
      this.carregarClientes();
    });
  }

  filtrarClientes(): void {
    this.aplicarFiltros();
  }

  adicionarTelefone() {
    if (!this.novoCliente.telefones) {
      this.novoCliente.telefones = []; // Inicialize o array de telefones
    }
    this.novoCliente.telefones.push(''); // Adicione um novo telefone em branco
  }

  removerTelefone(index: number) {
    this.novoCliente.telefones.splice(index, 1); // Remova o telefone pelo índice
  }

  aplicarFiltros(): void {
    this.clientesFiltrados = this.clientes.filter(cliente =>
      (!this.filtroNome || cliente.nome.toLowerCase().includes(this.filtroNome.toLowerCase())) &&
      (!this.filtroAtivo || cliente.ativo)
    );
  }
}
