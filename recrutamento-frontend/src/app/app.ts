import { Component } from '@angular/core';
import { CandidatoComponent } from './components/candidato/candidato'; // Importe o componente Candidato
import { VagaComponent } from './components/vaga/vaga'; // Importe o componente Vaga
import { CandidaturaAplicarComponent } from './components/candidatura-aplicar/candidatura-aplicar'; // Importe o componente CandidaturaAplicar

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CandidatoComponent, // Adicione CandidatoComponent
    VagaComponent,      // Adicione VagaComponent
    CandidaturaAplicarComponent // Adicione CandidaturaAplicarComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'recrutamento-frontend';
}

