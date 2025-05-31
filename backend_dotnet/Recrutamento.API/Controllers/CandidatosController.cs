using Microsoft.AspNetCore.Mvc;
using Recrutamento.Dominio.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Recrutamento.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidatosController : ControllerBase
    {
        // Simulação de armazenamento em memória - TORNADO PÚBLICO PARA ACESSO
        public static List<Candidato> _candidatos = new List<Candidato>();
        private static int _nextId = 1;

        // GET: api/candidatos
        [HttpGet]
        public ActionResult<IEnumerable<Candidato>> GetCandidatos()
        {
            return Ok(_candidatos);
        }

        // GET: api/candidatos/5
        [HttpGet("{id}")]
        public ActionResult<Candidato> GetCandidato(int id)
        {
            var candidato = _candidatos.FirstOrDefault(c => c.Id == id);
            if (candidato == null)
            {
                return NotFound();
            }
            return Ok(candidato);
        }

        // POST: api/candidatos
        [HttpPost]
        public ActionResult<Candidato> PostCandidato(Candidato candidato)
        {
            if (candidato == null || string.IsNullOrWhiteSpace(candidato.Nome) || string.IsNullOrWhiteSpace(candidato.Email))
            {
                return BadRequest("Dados do candidato inválidos.");
            }

            candidato.Id = _nextId++;
            _candidatos.Add(candidato);

            // Retorna 201 Created com a localização do novo recurso e o próprio recurso
            return CreatedAtAction(nameof(GetCandidato), new { id = candidato.Id }, candidato);
        }

        // Adicione PUT e DELETE se necessário
    }
}

