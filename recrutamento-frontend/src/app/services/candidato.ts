import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir a interface para Candidato (espelhando o backend)
export interface Candidato {
  id?: number; // O ID é opcional ao criar
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private apiUrl = 'http://localhost:5000/api/candidatos'; // URL do backend .NET

  constructor(private http: HttpClient) { }

  // Método para buscar todos os candidatos
  getCandidatos(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(this.apiUrl);
  }

  // Método para adicionar um novo candidato
  addCandidato(candidato: Candidato): Observable<Candidato> {
    return this.http.post<Candidato>(this.apiUrl, candidato);
  }

  // Adicione métodos para GET por ID, PUT, DELETE se necessário
}

