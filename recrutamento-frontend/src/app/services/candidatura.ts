import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir a interface para Candidatura (espelhando o backend)
export interface Candidatura {
  id?: number;
  candidatoId: number;
  vagaId: number;
  dataAplicacao?: Date; // O backend define isso
}

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {

  private apiUrl = 'http://localhost:5000/api/candidaturas'; // URL do backend .NET

  constructor(private http: HttpClient) { }

  // Método para um candidato se inscrever em uma vaga
  aplicarParaVaga(candidatura: Candidatura): Observable<Candidatura> {
    // O backend espera CandidatoId e VagaId
    const payload = { candidatoId: candidatura.candidatoId, vagaId: candidatura.vagaId };
    return this.http.post<Candidatura>(this.apiUrl, payload);
  }

  // Adicione método para buscar candidaturas se necessário (GET)
}

