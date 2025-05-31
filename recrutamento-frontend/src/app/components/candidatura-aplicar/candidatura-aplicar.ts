import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CandidaturaService, Candidatura } from '../../services/candidatura'; // Ajuste o caminho
import { CandidatoService, Candidato } from '../../services/candidato'; // Importar serviço e interface de Candidato
import { VagaService, Vaga } from '../../services/vaga'; // Importar serviço e interface de Vaga

@Component({
  selector: 'app-candidatura-aplicar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './candidatura-aplicar.html',
  styleUrls: ['./candidatura-aplicar.css']
})
export class CandidaturaAplicarComponent implements OnInit {

  candidatos: Candidato[] = [];
  vagas: Vaga[] = [];
  candidatoSelecionadoId: number | null = null;
  vagaSelecionadaId: number | null = null;
  mensagemErro: string | null = null;
  mensagemSucesso: string | null = null;

  constructor(
    private candidaturaService: CandidaturaService,
    private candidatoService: CandidatoService,
    private vagaService: VagaService
  ) { }

  ngOnInit(): void {
    this.carregarCandidatos();
    this.carregarVagas();
  }

  carregarCandidatos(): void {
    this.candidatoService.getCandidatos().subscribe({
      next: (data) => this.candidatos = data,
      error: (err) => {
        console.error('Erro ao buscar candidatos:', err);
        this.mensagemErro = 'Falha ao carregar candidatos para seleção.';
      }
    });
  }

  carregarVagas(): void {
    this.vagaService.getVagas().subscribe({
      next: (data) => this.vagas = data,
      error: (err) => {
        console.error('Erro ao buscar vagas:', err);
        this.mensagemErro = 'Falha ao carregar vagas para seleção.';
      }
    });
  }

  aplicarParaVaga(): void {
    this.mensagemErro = null;
    this.mensagemSucesso = null;

    if (!this.candidatoSelecionadoId || !this.vagaSelecionadaId) {
      this.mensagemErro = 'Por favor, selecione um candidato e uma vaga.';
      return;
    }

    const novaCandidatura: Candidatura = {
      candidatoId: this.candidatoSelecionadoId,
      vagaId: this.vagaSelecionadaId
    };

    this.candidaturaService.aplicarParaVaga(novaCandidatura).subscribe({
      next: (candidaturaAdicionada) => {
        this.mensagemSucesso = `Candidato (ID: ${this.candidatoSelecionadoId}) aplicou para a Vaga (ID: ${this.vagaSelecionadaId}) com sucesso! ID da Candidatura: ${candidaturaAdicionada.id}`;
        // Limpar seleção ou dar feedback
        this.candidatoSelecionadoId = null;
        this.vagaSelecionadaId = null;
        setTimeout(() => this.mensagemSucesso = null, 5000);
      },
      error: (err) => {
        console.error('Erro ao aplicar para vaga:', err);
        let errorMsg = 'Falha ao aplicar para a vaga.';
        if (err.status === 409) { // Conflict
             errorMsg = 'Este candidato já aplicou para esta vaga.';
        } else if (err.error && typeof err.error === 'string') {
            errorMsg += ` Detalhe: ${err.error}`;
        } else if (err.error && err.error.title) {
            errorMsg += ` Detalhe: ${err.error.title}`;
        } else if (err.error && err.error.errors) {
            // Handle validation errors if backend returns them in a specific format
            try {
                const errors = Object.values(err.error.errors).flat();
                errorMsg += ` Detalhes: ${errors.join(', ')}`;
            } catch (e) { /* ignore */ }
        }
        this.mensagemErro = errorMsg;
      }
    });
  }
}

