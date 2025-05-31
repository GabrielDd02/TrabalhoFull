using Microsoft.AspNetCore.Mvc;
using Recrutamento.Dominio.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Recrutamento.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidaturasController : ControllerBase
    {
        // Simulação de armazenamento em memória
        // Dependência dos outros controllers para acesso às listas (simplificação)
        // Em uma aplicação real, usaríamos serviços injetados e um repositório
        private static List<Candidatura> _candidaturas = new List<Candidatura>();
        private static int _nextId = 1;

        // Referências estáticas às listas dos outros controllers (APENAS PARA SIMULAÇÃO)
        // Isso NÃO é uma boa prática em produção. Usar injeção de dependência.
        private static List<Candidato> _candidatos => CandidatosController._candidatos; // Acesso à lista estática
        private static List<Vaga> _vagas => VagasController._vagas; // Acesso à lista estática


        // GET: api/candidaturas (Opcional, para listar todas as candidaturas)
        [HttpGet]
        public ActionResult<IEnumerable<Candidatura>> GetCandidaturas()
        {
            // Poderia incluir lógica para popular Candidato e Vaga, mas manteremos simples
            return Ok(_candidaturas);
        }

        // POST: api/candidaturas
        [HttpPost]
        public ActionResult<Candidatura> PostCandidatura(Candidatura candidatura)
        {
            if (candidatura == null)
            {
                return BadRequest("Dados da candidatura inválidos.");
            }

            // Valida se o candidato existe
            var candidatoExistente = _candidatos.FirstOrDefault(c => c.Id == candidatura.CandidatoId);
            if (candidatoExistente == null)
            {
                return BadRequest($"Candidato com ID {candidatura.CandidatoId} não encontrado.");
            }

            // Valida se a vaga existe
            var vagaExistente = _vagas.FirstOrDefault(v => v.Id == candidatura.VagaId);
            if (vagaExistente == null)
            {
                return BadRequest($"Vaga com ID {candidatura.VagaId} não encontrada.");
            }

            // Valida se já existe candidatura para este candidato nesta vaga (opcional)
            bool jaAplicou = _candidaturas.Any(cand => cand.CandidatoId == candidatura.CandidatoId && cand.VagaId == candidatura.VagaId);
            if (jaAplicou)
            {
                 return Conflict($"Candidato já aplicou para esta vaga."); // Retorna 409 Conflict
            }


            candidatura.Id = _nextId++;
            candidatura.DataAplicacao = DateTime.UtcNow;
            // Não populamos Candidato e Vaga aqui para simplificar, o frontend pode buscar se precisar
            candidatura.Candidato = null;
            candidatura.Vaga = null;

            _candidaturas.Add(candidatura);

            // Retorna 201 Created. Idealmente retornaria a candidatura completa, mas simplificamos.
            return CreatedAtAction(nameof(GetCandidaturas), new { id = candidatura.Id }, candidatura); // Poderia ter um GetCandidatura(id)
        }

        // Adicione GET por ID, PUT, DELETE se necessário
    }
}

