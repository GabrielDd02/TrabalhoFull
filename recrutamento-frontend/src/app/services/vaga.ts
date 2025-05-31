import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir a interface para Vaga (espelhando o backend)
export interface Vaga {
  id?: number;
  titulo: string;
  descricao?: string; // Tornar opcional ou ajustar conforme backend
}

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  private apiUrl = 'http://localhost:5000/api/vagas'; // URL do backend .NET

  constructor(private http: HttpClient) { }

  // Método para buscar todas as vagas
  getVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.apiUrl);
  }

  // Método para adicionar uma nova vaga
  addVaga(vaga: Vaga): Observable<Vaga> {
    return this.http.post<Vaga>(this.apiUrl, vaga);
  }

  // Adicione métodos para GET por ID, PUT, DELETE se necessário
}

