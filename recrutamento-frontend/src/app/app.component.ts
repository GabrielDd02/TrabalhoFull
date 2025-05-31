/* Recriando o AppComponent para integrar os serviços e componentes que interagem com o backend */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CandidatoService } from './services/candidato';
import { VagaService } from './services/vaga';
import { CandidaturaService } from './services/candidatura';
import { CandidatoComponent } from './components/candidato/candidato';
import { VagaComponent } from './components/vaga/vaga';
import { CandidaturaAplicarComponent } from './components/candidatura-aplicar/candidatura-aplicar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CandidatoComponent, VagaComponent, CandidaturaAplicarComponent],
  template: `
    <h1>Recrutamento Frontend</h1>
    <p>Bem-vindo ao sistema de recrutamento. Utilize as seções abaixo para gerenciar candidatos, vagas e candidaturas.</p>
    <hr />
    <h2>Gerenciar Candidatos</h2>
    <app-candidato></app-candidato>
    <hr />
    <h2>Gerenciar Vagas</h2>
    <app-vaga></app-vaga>
    <hr />
    <h2>Aplicar Candidatura</h2>
    <app-candidatura-aplicar></app-candidatura-aplicar>
  `,
  styles: [`
    h1, h2 { color: #333; }
    hr { margin: 20px 0; }
  `]
})
export class AppComponent {
  constructor(private candidatoService: CandidatoService, private vagaService: VagaService, private candidaturaService: CandidaturaService) { }
} 