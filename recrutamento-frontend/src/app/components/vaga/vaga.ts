import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VagaService, Vaga } from '../../services/vaga'; // Ajuste o caminho
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-vaga',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './vaga.html',
  styleUrls: ['./vaga.css']
})
export class VagaComponent implements OnInit {

  vagas: Vaga[] = [];
  novaVaga: Vaga = { titulo: '', descricao: '' };
  mensagemErro: string | null = null;
  mensagemSucesso: string | null = null;

  constructor(private vagaService: VagaService) { }

  ngOnInit(): void {
    this.carregarVagas();
  }

  carregarVagas(): void {
    this.vagaService.getVagas().subscribe({
      next: (data) => {
        this.vagas = data;
        this.mensagemErro = null;
      },
      error: (err) => {
        console.error('Erro ao buscar vagas:', err);
        this.mensagemErro = 'Falha ao carregar vagas. Verifique se o backend está rodando.';
      }
    });
  }

  adicionarVaga(): void {
    if (!this.novaVaga.titulo) {
        this.mensagemErro = 'Título da vaga é obrigatório.';
        this.mensagemSucesso = null;
        return;
    }
    this.vagaService.addVaga(this.novaVaga).subscribe({
      next: (vagaAdicionada) => {
        this.vagas.push(vagaAdicionada);
        this.novaVaga = { titulo: '', descricao: '' }; // Limpa o formulário
        this.mensagemSucesso = 'Vaga adicionada com sucesso!';
        this.mensagemErro = null;
        setTimeout(() => this.mensagemSucesso = null, 3000);
      },
      error: (err) => {
        console.error('Erro ao adicionar vaga:', err);
        // Tentar extrair mensagem de erro do backend se disponível
        let errorMsg = 'Falha ao adicionar vaga.';
        if (err.error && typeof err.error === 'string') {
            errorMsg += ` Detalhe: ${err.error}`;
        } else if (err.error && err.error.title) {
            errorMsg += ` Detalhe: ${err.error.title}`;
        }
        this.mensagemErro = errorMsg;
        this.mensagemSucesso = null;
      }
    });
  }
}

