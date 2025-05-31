import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule and NgForm
import { CandidatoService, Candidato } from '../../services/candidato'; // Ajuste o caminho se necessário
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-candidato',
  standalone: true, // Indica que é um componente standalone
  imports: [
    CommonModule, // Adiciona CommonModule aos imports
    FormsModule, // Adiciona FormsModule aos imports
    HttpClientModule // Adiciona HttpClientModule
  ],
  templateUrl: './candidato.html',
  styleUrls: ['./candidato.css']
})
export class CandidatoComponent implements OnInit {

  candidatos: Candidato[] = [];
  novoCandidato: Candidato = { nome: '', email: '' }; // Modelo para o formulário
  mensagemErro: string | null = null;
  mensagemSucesso: string | null = null;

  constructor(private candidatoService: CandidatoService) { }

  ngOnInit(): void {
    this.carregarCandidatos();
  }

  carregarCandidatos(): void {
    this.candidatoService.getCandidatos().subscribe({
      next: (data) => {
        this.candidatos = data;
        this.mensagemErro = null;
      },
      error: (err) => {
        console.error('Erro ao buscar candidatos:', err);
        this.mensagemErro = 'Falha ao carregar candidatos. Verifique se o backend está rodando.';
        this.mensagemSucesso = null; // Limpa msg de sucesso em caso de erro
      }
    });
  }

  // Removida a validação manual, pois o formulário template-driven cuida disso
  adicionarCandidato(form?: NgForm): void { // Opcional: receber o form para resetar
    this.mensagemErro = null; // Limpa erro anterior
    this.mensagemSucesso = null; // Limpa sucesso anterior

    this.candidatoService.addCandidato(this.novoCandidato).subscribe({
      next: (candidatoAdicionado) => {
        this.candidatos.push(candidatoAdicionado);
        this.novoCandidato = { nome: '', email: '' }; // Limpa o modelo
        if (form) {
          form.resetForm(); // Reseta o estado do formulário (incluindo validação)
        }
        this.mensagemSucesso = 'Candidato adicionado com sucesso!';
        // Limpa a mensagem de sucesso após alguns segundos
        setTimeout(() => this.mensagemSucesso = null, 3000);
      },
      error: (err) => {
        console.error('Erro ao adicionar candidato:', err);
        // Tenta extrair uma mensagem de erro mais específica do backend, se disponível
        const errorMsg = err.error?.message || err.message || 'Falha ao adicionar candidato.';
        this.mensagemErro = `Erro: ${errorMsg}`;
      }
    });
  }
}

